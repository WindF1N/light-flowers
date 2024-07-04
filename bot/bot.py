from aiogram import Bot, Dispatcher, executor, types
import asyncio
import logging
from motor.motor_asyncio import AsyncIOMotorClient
import traceback
import json
import re

API_TOKEN = '7406131994:AAEyqJgeUdjFzfm8hFHk-f5vwvMz8xBiqbU'
MONGO_URI = 'mongodb://localhost:27017'

logging.basicConfig(level=logging.INFO)

bot = Bot(token=API_TOKEN)
loop = asyncio.get_event_loop()
dp = Dispatcher(bot, loop=loop)

# Создание клиента MongoDB
mongo_client = AsyncIOMotorClient(MONGO_URI)
db = mongo_client['light-flowers']

def multiply_price(price_string, multiplier):
    # Удаляем все символы, кроме цифр и пробелов, из строки цены
    cleaned_price_string = re.sub(r'[^\d\s]', '', price_string)
    # Убираем пробелы для получения чистого числа
    amount = cleaned_price_string.replace(' ', '')
    # Умножаем количество на множитель и округляем до целого числа
    total_amount = round(int(amount) * multiplier)
    # Форматируем сумму с разделением тысяч
    formatted_amount = f'{total_amount:,}'.replace(',', ' ')
    # Возвращаем форматированную строку с суммой
    return formatted_amount

def get_price(data):
    if "prices" in data:
        for price in data["prices"]:
            checked = [0, 0, 0, 0]
            if len(price["colors"]) > 0:
                if data["selectedColor"] in price["colors"]:
                    checked[0] = 1
            else:
                checked[0] = 1
            if len(price["counts"]) > 0:
                if data["selectedCount"] in price["counts"]:
                    checked[1] = 1
            else:
                checked[1] = 1
            if len(price["packages"]) > 0:
                if data["selectedPackage"] in price["packages"]:
                    checked[2] = 1
            else:
                checked[2] = 1
            if len(price["sizes"]) > 0:
                if data["selectedSize"] in price["sizes"]:
                    checked[3] = 1
            else:
                checked[3] = 1

            if checked == [1, 1, 1, 1]:
                return [price["price"], price["oldPrice"]]
    return [data["price"], data["oldPrice"]]

def get_total(items):
    totalPrice, totalOldPrice = 0, 0
    for item in items:
        [price, oldPrice] = get_price(item["product"])
        price = int(re.sub(r'[^\d]', '', price)) if price else 0
        oldPrice = int(re.sub(r'[^\d]', '', oldPrice)) if oldPrice else 0
        totalPrice += price * item["count"]
        totalOldPrice += oldPrice * item["count"]
    return ['{:,}'.format(totalPrice).replace(',', ' '), '{:,}'.format(totalOldPrice).replace(',', ' ')]

async def background_task():
    while True:
        # Получение всех документов, которые не имеют поля sended
        hints_cursor = db.hints.find({"sended": {"$exists": False}})
        async for document in hints_cursor:
            char = ""
            if document["product"]["selectedColor"]:
                char += document["product"]["selectedColor"]
            if document["product"]["selectedCount"]:
                if len(char) > 0:
                    char += f', {document["product"]["selectedCount"]}'
                else:
                    char += document["product"]["selectedCount"]
            if document["product"]["selectedPackage"]:
                if len(char) > 0:
                    char += f', {document["product"]["selectedPackage"]}'
                else:
                    char += document["product"]["selectedPackage"]
            if document["product"]["selectedSize"]:
                if len(char) > 0:
                    char += f', {document["product"]["selectedSize"]},'
                else:
                    char += f'{document["product"]["selectedSize"]},'
            for i in [1265381195, 453500861]:
                try:
                    await bot.send_message(i, f"""
<b>Намёк</b>\n
от: {document["name"]}
имя получателя: {document["receiver_name"]}
телефон получателя: {document["receiver_phone"]}\n

- {document["product"]["title"]}, {char} {document["count"]} шт, {multiply_price(get_price(document["product"])[0], document["count"])} ₽ ({get_price(document["product"])[0]} / шт)

<i>{document["created_at"].strftime("%Y-%m-%d %H:%M:%S")}</i>
        """, parse_mode="HTML")
                except:
                    traceback.print_exc()
            # Обновление документа, добавление поля sended со значением True
            db.hints.update_one({"_id": document["_id"]}, {"$set": {"sended": True}})

        # Получение всех документов, которые не имеют поля sended
        orders_cursor = db.orders.find({"sended": {"$exists": False}})
        async for document in orders_cursor:
            msg = f"""
<b>Заказ</b>\n
Имя: {document["name"]}
Телефон: {document["phone"]}
Анонимный для получателя: {"Да" if document["anonymous"] == True else "Нет"}\n
Имя получателя: {document["receiver_name"]}
Телефон получателя: {document["receiver_phone"]}
Подпись для открытки: {document["text_of_postcard"]}
Комментарий: {document["comment"]}\n
Способ доставки: {document["delivery"]}\n"""
            if document["delivery"] == "Курьером":
                msg += f"""Адрес доставки: {document["address"] if document["request_address"] != True else "Уточнить у получателя" }\nДата доставки: {document["date_of_post"]}\nВремя доставки: {document["time_of_post"]}\n"""
            msg += "\nТовары:\n"
            for item in document["items"]:
                char = ""
                if item["product"]["selectedColor"]:
                    char += item["product"]["selectedColor"]
                if item["product"]["selectedCount"]:
                    if len(char) > 0:
                        char += f', {item["product"]["selectedCount"]}'
                    else:
                        char += item["product"]["selectedCount"]
                if item["product"]["selectedPackage"]:
                    if len(char) > 0:
                        char += f', {item["product"]["selectedPackage"]}'
                    else:
                        char += item["product"]["selectedPackage"]
                if item["product"]["selectedSize"]:
                    if len(char) > 0:
                        char += f', {item["product"]["selectedSize"]},'
                    else:
                        char += f'{item["product"]["selectedSize"]},'
                msg += f"""- {item["product"]["title"]}, {char} {item["count"]} шт, {multiply_price(get_price(item["product"])[0], item["count"])} ₽ ({get_price(item["product"])[0]} / шт)\n"""
            msg += f"""\nИтог: {get_total(document["items"])[0]} ₽\n"""
            msg += f"""\n<i>{document["created_at"].strftime("%Y-%m-%d %H:%M:%S")}</i>"""
            for i in [1265381195, 453500861]:
                try:
                    await bot.send_message(i, msg, parse_mode="HTML")
                except:
                    traceback.print_exc()
            # Обновление документа, добавление поля sended со значением True
            db.orders.update_one({"_id": document["_id"]}, {"$set": {"sended": True}})
            
        await asyncio.sleep(10)  # Пауза в 30 секунд


@dp.message_handler(commands=['start', 'help'])
async def send_welcome(message: types.Message):
    user_id = message.from_user.id
    username = getattr(message.from_user, 'username', None)
    full_name = message.from_user.full_name

    # Проверяем, существует ли уже пользователь в базе данных
    existing_user = await db.users.find_one({'user_id': user_id})
    if not existing_user:
        # Если пользователя нет, добавляем его в базу данных
        await db.users.insert_one({
            'user_id': user_id,
            'username': username,
            'full_name': full_name,
            'start_date': message.date
        })

    greeting = f"""{f"Привет, @{username}!" if username else "Привет!"} Это <b>Студия Роз | LIGHT Business</b>, переходи в приложение, чтобы порадовать своих любимых."""
    
    # Создаем кнопку
    inline_btn = types.InlineKeyboardButton('Запустить приложение', url='https://t.me/lightbizbot/litee')
    inline_kb = types.InlineKeyboardMarkup().add(inline_btn)
    
    # Отправляем сообщение с кнопкой
    await message.reply(greeting, parse_mode="HTML", reply_markup=inline_kb)

if __name__ == '__main__':
    dp.loop.create_task(background_task())
    executor.start_polling(dp, skip_updates=True)
