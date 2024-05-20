import styles from './styles/Post.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Slider from './Slider';
import { useMainContext } from '../context';

function Post({ data }) {

  const navigate = useNavigate();
  const { message, setMessage, sendMessage, setPosts } = useMainContext();
  const [ user, setUser ] = useState(null);
  const imagesDivRef = useRef();
  const [ activeImage, setActiveImage ] = useState(0);
  const [ lastCommentUser, setLastCommentUser ] = useState(null);
  const [ commentsCount, setCommentsCount ] = useState(0);
  const [ isFavorite, setIsFavorite ] = useState(data.isFavorite || false);

  useEffect(() => {
    if (!data.images ) {
      sendMessage(JSON.stringify(["images", "get", data._id, "main"]));
    }
  }, [data])

  useEffect(() => {
    if (!data.user && data.images) {
      sendMessage(JSON.stringify(["user", "get", {_id: data.user_id, post_id: data._id}]));
      sendMessage(JSON.stringify(["favorite_posts", "check", data._id]));
    }
  }, [data])

  useEffect(() => {
    sendMessage(JSON.stringify(["user", "get", {_id: data.user_id, post_id: data._id}]));
    sendMessage(JSON.stringify(["comments", "last", {post_id: data._id}]));
    sendMessage(JSON.stringify(["comments", "count", {post_id: data._id}]));
  }, [])

  const handleFavorite = () => {
    sendMessage(JSON.stringify(["favorite_posts", "action", data._id]));
    setIsFavorite(!isFavorite);
  }

  return (
    <div className={styles.post}>
      <div className={styles.header}>
        <div className={styles.user} onClick={() => navigate("/users/"+data.user?._id)}>
          <div className={styles.avatar}>
            <img src={data.user?.avatar || require("./images/non-avatar.svg").default} alt="" />
          </div>
          <div className={styles.information}>
            <span>{data.user?.username ? data.user.username : data.user?._id}</span>
            {data.user?.city && <span>{data.user?.city}</span>}
          </div>
        </div>
        <div className={styles.like} onClick={handleFavorite}>
          <img src={isFavorite ? require("./images/like.svg").default : require("./images/like-active.svg").default} alt="" />
        </div>
      </div>
      <Slider images={data.images || []} imagesDivRef={imagesDivRef} setActiveImage={setActiveImage} category={data.input1} />
      <div className={styles.body} onClick={() => navigate(`/posts/${data._id}`)}>
        <div className={styles.price}>
          {data.input1 === "Автомобили" ? data.input39 : data.input5}
        </div>
        <div className={styles.title}>
          {data.input1 === "Автомобили" ? `${data.input5} ${data.input6}, ${data.input7}, ${data.input17}` : data.input2}
        </div>
        <div className={styles.info}>
          <div>{data.created_at}</div>
          <div>{data.view_count || 0} просмотров</div>
        </div>
        <div className={styles.arrow}>
          <img src={require("./images/arrow-down.svg").default} alt="" />
        </div>
      </div>

      <div className={styles.lastComment} onClick={() => navigate(`/posts/${data._id}/comments`)}>
        <div>Комментарии <span>{data.comments_count || 0}</span></div>
        {data.comments?.length > 0 &&
          <div className={styles.comment}>
            <img src={data.comments[0].avatar || require("./images/non-avatar.svg").default} alt="" /> <span>{data.comments[0].text}</span>
          </div>}
        <div className={styles.arrow}>
          <img src={require("./images/arrow-top-down.svg").default} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Post;
