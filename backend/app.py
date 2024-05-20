import os
import json
import random
import base64
from bson import ObjectId
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo
from flask_socketio import SocketIO, emit, disconnect
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, create_refresh_token, get_jwt_identity
from pymongo import DESCENDING
from werkzeug.security import generate_password_hash, check_password_hash
from base64 import b64decode
from PIL import Image, ExifTags
from io import BytesIO
from jwt import ExpiredSignatureError
from datetime import datetime, timedelta
import uuid
import smtplib
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=60)
app.config['MAX_CONTENT_LENGTH'] = 1024 * 1024 * 1024  # 16 megabytes
CORS(app, resources={r"/*": {"origins": "*"}})
mongo = PyMongo(app)
socketio = SocketIO(app, cors_allowed_origins="*", max_http_buffer_size=1024 * 1024 * 1024)
jwt = JWTManager(app)

def compress_image(image_data, max_size, quality):
    image = Image.open(BytesIO(image_data))

    # Проверка EXIF-данных для ориентации
    exif = image._getexif()
    if exif is not None:
        exif = dict(exif.items())
        orientation = exif.get(274)  # 274 - это ключ для ориентации в EXIF-данных
        if orientation == 3:
            image = image.rotate(180, expand=True)
        elif orientation == 6:
            image = image.rotate(270, expand=True)
        elif orientation == 8:
            image = image.rotate(90, expand=True)

    image.thumbnail(max_size, Image.LANCZOS)
    img_byte_arr = BytesIO()
    image.save(img_byte_arr, format='JPEG', quality=quality)
    return img_byte_arr.getvalue()

def prepare_data(data):
    if isinstance(data, list):
        return [prepare_data(item) for item in data]
    elif isinstance(data, dict):
        return {k: prepare_data(v) for k, v in data.items()}
    elif isinstance(data, (ObjectId, datetime)):
        return str(data) if isinstance(data, ObjectId) else data.strftime('%Y-%m-%d %H:%M:%S')
    else:
        return data

def reverse_prepare_data(data):
    if isinstance(data, list):
        return [reverse_prepare_data(item) for item in data]
    elif isinstance(data, dict):
        return {k: reverse_prepare_data(v) for k, v in data.items()}
    elif isinstance(data, str):
        try:
            # Пытаемся преобразовать строку в ObjectId
            return ObjectId(data)
        except Exception:
            try:
                # Пытаемся преобразовать строку в datetime
                return datetime.strptime(data, '%Y-%m-%d %H:%M:%S')
            except Exception:
                # Если не удалось преобразовать, возвращаем исходную строку
                return data
    else:
        return data

def generate_verification_code():
    return ''.join(str(random.randint(0, 9)) for _ in range(6))

@app.route('/login', methods=['POST'])
def login():
    phone = request.json.get('phone', None)
    user = mongo.db.users.find_one({"phone": phone})
    if not user:
        mongo.db.users.insert_one({
            "phone": phone,
            "created_at": datetime.now(),
        }).inserted_id
        return jsonify(follow={"link": "/verify", "replace": False}), 200
    else:
        try:
            user["code_access"]
            del user["code_access"]
            return jsonify(user=prepare_data(user), follow={"link": "/verify?type=login", "replace": False}), 200
        except:
            return jsonify(follow={"link": "/verify", "replace": False}), 200

@app.route('/verify', methods=['POST'])
def verify():
    phone = request.json.get('phone', None)
    code = request.json.get('code', None)
    user = mongo.db.users.find_one({"phone": phone})
    if user:
        if "code_access" in user:
            if user["code_access"] != code:
                return jsonify(error="Неверный код доступа, попробуйте ещё раз"), 200
        else:
            mongo.db.users.update_one({"phone": phone}, {"$set": {"code_access": code}})
        access_token = create_access_token(identity=phone)
        refresh_token = create_refresh_token(identity=phone)
        return jsonify(access_token=access_token, refresh_token=refresh_token, follow={"link": "/", "replace": False}), 200

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    refresh_token = create_refresh_token(identity=current_user)
    return jsonify(access_token=access_token, refresh_token=refresh_token), 200

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@socketio.on('connect')
def handle_connect():
    print('A user connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected')

@socketio.on('message')
@jwt_required(optional=True)
def handle_message(message):
    message = json.loads(message)
    print(message)

    # mongo.db.users.delete_many({})
    # mongo.db.posts.delete_many({})
    # mongo.db.comments.delete_many({})
    # mongo.db.images.delete_many({})
    # mongo.db.codes.delete_many({})

    if message[0] == 'user':
        if message[1] == 'me':
            current_user = get_jwt_identity()
            user = mongo.db.users.find_one({"phone": current_user})
            if user:
                emit('message', json.dumps(["user", "me", prepare_data(user)]))
            else:
                emit('message', json.dumps(["user", "me", None]))
        elif message[1] == 'update':
            current_user = get_jwt_identity()
            if current_user:
                if 'username' in message[2]:
                    result = mongo.db.users.find_one({"username": message[2]["username"], "phone": {"$ne": current_user}})
                    if result:
                        emit('message', json.dumps(["error", "Пользователь с таким никнеймом уже зарегистрирован"]))
                        return
                mongo.db.users.update_one({"phone": current_user}, {"$set": message[2]})
                user = mongo.db.users.find_one({"phone": current_user})
                emit('message', json.dumps(["user", "me", prepare_data(user)]))
        elif message[1] == 'get':
            if "_id" in message[2]:
                message[2]["_id"] = ObjectId(message[2]["_id"])
            if "post_id" in message[2]:
                post_id = message[2]["post_id"]
                del message[2]["post_id"]
            else:
                post_id = None
            user = mongo.db.users.find_one(message[2])
            if not user:
                emit('message', json.dumps(["error", f"{message[2]} не найден"]))
            else:
                emit('message', json.dumps(["user", "get", prepare_data(user), post_id]))
        elif message[1] == 'list':
            users = list(mongo.db.users.find({"username": {"$exists": True}, "name": {"$exists": True}}).limit(100))
            emit('message', json.dumps(["user", "list", prepare_data(users)]))
    elif message[0] == 'posts':
        if message[1] == 'create':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                mongo.db.posts.delete_many({"user_id": user['_id'], "status": 0})
                new_post_id = mongo.db.posts.insert_one({
                    "created_at": datetime.now(),
                    "user_id": user['_id'],
                    "status": 0
                }).inserted_id
                emit('message', json.dumps(["posts", "create", str(new_post_id)]))
        elif message[1] == 'update':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                mongo.db.posts.update_one({"_id": ObjectId(message[2])}, {"$set": message[3]})
                post = mongo.db.posts.find_one({"_id": ObjectId(message[2]), "status": 1})
                if post:
                    emit('message', json.dumps(["posts", "new"]))
        elif message[1] == 'get':
            post = mongo.db.posts.find_one({"_id": ObjectId(message[2])})
            emit('message', json.dumps(["posts", "get", prepare_data(post)]))
        elif message[1] == 'list':
            posts = list(mongo.db.posts.find({"status": 1}).limit(25))
            emit('message', json.dumps(["posts", "list", prepare_data(posts)]))
        elif message[1] == 'filter':
            posts = list(mongo.db.posts.find(reverse_prepare_data(message[2])))
            emit('message', json.dumps(["posts", "filter", prepare_data(posts)]))
    elif message[0] == 'images':
        if message[1] == 'add':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                image_data = b64decode(message[3].split(',')[-1])
                # Сжимаем изображение
                compressed_image_data = compress_image(image_data, (1200, 800), 95)
                compressed_image_data_lazy = compress_image(image_data, (100, 50), 75)
                 # Генерируем случайное название файла
                filename = str(uuid.uuid4()) + '.jpeg'
                # Сохраняем сжатое изображение в файл
                with open(f'static/{filename}', 'wb') as f:
                    f.write(compressed_image_data)
                with open(f'static/lazy/{filename}', 'wb') as f:
                    f.write(compressed_image_data_lazy)

                new_image_id = mongo.db.images.insert_one({
                    "created_at": datetime.now(),
                    "user_id": user['_id'],
                    "post_id": ObjectId(message[2]),
                    "file": f"{os.getenv('SERVER_END_POINT')}/static/{filename}",
                    "file_lazy": f"{os.getenv('SERVER_END_POINT')}/static/lazy/{filename}",
                    "type": message[4],
                    "index": message[5]
                }).inserted_id
                emit('message', json.dumps(["images", "add", str(new_image_id)]))
        elif message[1] == 'remove':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                mongo.db.images.delete_one({"_id": ObjectId(message[2]), "user_id": user["_id"]})
        elif message[1] == 'get':
            images = list(mongo.db.images.find({"post_id": ObjectId(message[2]), "type": message[3]}))
            emit('message', json.dumps(["images", "get", prepare_data(images), message[2]]))
    elif message[0] == 'comments':
        if message[1] == 'add':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                new_comment_id = mongo.db.comments.insert_one({
                    "created_at": datetime.now(),
                    "user_id": user['_id'],
                    "post_id": ObjectId(message[2]),
                    "text": message[3]
                }).inserted_id
                new_comment = mongo.db.comments.find_one({"_id": new_comment_id})
                if new_comment:
                    print(new_comment)
                    emit('message', json.dumps(["comments", "add", prepare_data(new_comment)]))
        elif message[1] == 'get':
            comment = mongo.db.comments.find_one(message[2])
            if not comment:
                emit('message', json.dumps(["error", f"{message[2]} не найден"]))
            else:
                emit('message', json.dumps(["comments", "get", prepare_data(comment)]))
        elif message[1] == 'last':
            last_comment = mongo.db.comments.find_one(reverse_prepare_data(message[2]), sort=[("_id", DESCENDING)])
            if last_comment:
                last_comment_user = mongo.db.users.find_one({"_id": last_comment["user_id"]})
                if "avatar" in last_comment_user:
                    last_comment["avatar"] = last_comment_user["avatar"]
                last_comment["username"] = last_comment_user["username"]
                emit('message', json.dumps(["comments", "last", prepare_data(last_comment), message[2]["post_id"]]))
        elif message[1] == 'list':
            comments = list(mongo.db.comments.find({"post_id": ObjectId(message[2])}).limit(25))
            emit('message', json.dumps(["comments", "list", prepare_data(comments), message[2]]))
        elif message[1] == 'count':
            count = mongo.db.comments.count_documents(reverse_prepare_data(message[2]))
            emit('message', json.dumps(["comments", "count", count, message[2]["post_id"]]))
    elif message[0] == 'subscribe':
        if message[1] == 'check':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                sub_user = mongo.db.users.find_one(message[2])
                if sub_user:
                    subscribe = mongo.db.subscribe.find_one({"user_id": user["_id"], "sub_user_id": sub_user["_id"]})
                    if subscribe:
                        emit('message', json.dumps(["subscribe", "check", True]))
                    else:
                        emit('message', json.dumps(["subscribe", "check", False]))
        elif message[1] == 'action':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                sub_user = mongo.db.users.find_one(message[2])
                if sub_user:
                    subscribe = mongo.db.subscribe.find_one({"user_id": user["_id"], "sub_user_id": sub_user["_id"]})
                    if subscribe:
                        mongo.db.subscribe.delete_one({"_id": subscribe["_id"]})
                        emit('message', json.dumps(["subscribe", "check", False]))
                    else:
                        mongo.db.subscribe.insert_one({"user_id": user["_id"], "sub_user_id": sub_user["_id"]})
                        emit('message', json.dumps(["subscribe", "check", True]))
    elif message[0] == 'favorite_posts':
        if message[1] == 'check':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                post = mongo.db.posts.find_one({"_id": ObjectId(message[2])})
                if post:
                    favorite = mongo.db.favorite_posts.find_one({"user_id": user["_id"], "post_id": post["_id"]})
                    if favorite:
                        emit('message', json.dumps(["favorite_posts", "check", True, message[2]]))
                    else:
                        emit('message', json.dumps(["favorite_posts", "check", False, message[2]]))
        elif message[1] == 'action':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                post = mongo.db.posts.find_one({"_id": ObjectId(message[2])})
                if post:
                    favorite = mongo.db.favorite_posts.find_one({"user_id": user["_id"], "post_id": post["_id"]})
                    if favorite:
                        mongo.db.favorite_posts.delete_one({"_id": favorite["_id"]})
                        emit('message', json.dumps(["favorite_posts", "check", False, message[2]]))
                    else:
                        mongo.db.favorite_posts.insert_one({"user_id": user["_id"], "post_id": post["_id"]})
                        emit('message', json.dumps(["favorite_posts", "check", True, message[2]]))
    elif message[0] == 'favorite_comments':
        if message[1] == 'check':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                comment = mongo.db.comments.find_one({"_id": ObjectId(message[2])})
                if comment:
                    favorite = mongo.db.favorite_comments.find_one({"user_id": user["_id"], "comment_id": comment["_id"]})
                    if favorite:
                        emit('message', json.dumps(["favorite_comments", "check", True, message[2]]))
                    else:
                        emit('message', json.dumps(["favorite_comments", "check", False, message[2]]))
        elif message[1] == 'action':
            current_user = get_jwt_identity()
            if current_user:
                user = mongo.db.users.find_one({"phone": current_user})
                if not user:
                    emit('message', json.dumps(["error", "Ошибка авторизации"]))
                    return
                comment = mongo.db.comments.find_one({"_id": ObjectId(message[2])})
                if comment:
                    favorite = mongo.db.favorite_comments.find_one({"user_id": user["_id"], "comment_id": comment["_id"]})
                    if favorite:
                        mongo.db.favorite_comments.delete_one({"_id": favorite["_id"]})
                        emit('message', json.dumps(["favorite_comments", "check", False, message[2]]))
                    else:
                        mongo.db.favorite_comments.insert_one({"user_id": user["_id"], "post_id": post["_id"]})
                        emit('message', json.dumps(["favorite_comments", "check", True, message[2]]))
    elif message[0] == 'stats':
        if message[1] == 'get':
            user = mongo.db.users.find_one(message[2])
            if user:
                count_posts = mongo.db.posts.count_documents({"user_id": user["_id"], "status": 1})
                count_subscribes = mongo.db.subscribe.count_documents({"user_id": user["_id"]})
                count_subscribers = mongo.db.subscribe.count_documents({"sub_user_id": user["_id"]})
                emit('message', json.dumps(["stats", "get", [count_posts, count_subscribes, count_subscribers]]))

@socketio.on_error_default
def default_error_handler(e):
    if isinstance(e, ExpiredSignatureError):
        emit('message', json.dumps(["error", "Token has expired"]))
    elif 'Signature verification failed' in str(e):
        emit('message', json.dumps(["error", "Token has expired"]))
    else:
        print(str(e))

if __name__ == '__main__':
    socketio.run(app)
