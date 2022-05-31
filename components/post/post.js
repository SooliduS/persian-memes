import Image from "next/image";
import styles from "./post.module.css";
import media from "../../public/images/media.jpg";
import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import InputEmoji from 'react-input-emoji'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link'
import useAuth from '../../hooks/useAuth'

const Post = ({ post }) => {

  const axiosPrivate = useAxiosPrivate()
  const formRef = useRef()
  const { auth } = useAuth()

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false)
  const [likeLoading, setLikeLoading] = useState(true)
  const [likesCounter , setLikesCounter] = useState(0)

  useEffect(() => {
    setComments(post.comments)
  }, [])

  useEffect(async () => {
    if (likeLoading === false) return
    try {
      const response = await axiosPrivate.get(`/posts/post/${post._id}`)
      const foundPost = response.data.post
      const isLiked = foundPost.likes ? foundPost.likes.find(id => id == auth.id) : null
      setLikesCounter(foundPost.likes.length)
      if (isLiked) return setLiked(true)
      else return setLiked(false)
    } catch (e) {
      console.log(e.message)
    } finally {
      setLikeLoading(false)
      
    }
  }, [likeLoading])

  const handleComment = async () => {

    try {
      const response = await axiosPrivate.post('/comments', {
        postId: post._id,
        comment: newComment
      })
      const newComments = [{ comment: newComment, author: response.data.result1.author, _id: response.data.result1._id }, ...comments];
      setComments(newComments)
    } catch (e) {
      console.log(e.message)
    } finally {
      setNewComment('')
    }

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleComment()
  }

  const handleLike = async (e) => {
    if (!auth.accessToken) return
    setLiked(true)
    try {
      const response = await axiosPrivate.get(`posts/like/${post._id}`)
    } catch (e) {
      console.log(e.message)
    } finally { setLikeLoading(true) }
  }

  const handleDislike = async (e) => {
    if (!auth.accessToken) return
    setLiked(false)
    try {
      const response = await axiosPrivate.get(`posts/dislike/${post._id}`)
    } catch (e) {
      console.log(e.message)
    } finally { setLikeLoading(true) }
  }

  return (
    <article className={`${styles.container} ${post.private===true && styles.private}`}>
      {post.media && <div className={styles.media}>
        <Image src={media} width="600px" height="400px" alt="no image" />
      </div>}

      <div className={styles.posttitle}>
        <p >
          <span className={styles.postAuthor}><Link href={`/users/${post.authorName}`}>{post.authorName}</Link> </span>
          <span>{post.title}</span>
        </p>
      </div>

      <div className={styles.caption}>
        <pre>
          {`${post.caption}`}
        </pre>
        <div className={styles.tags}>
          {post.tags.lenght !== 0 &&
            post.tags.map(tag => <span key={tag}><Link href={`/tags/${tag}`}>{`#${tag}`.replace(/\s/g, '')}</Link></span>)}
        </div>
      </div>



      <div className={styles.commentBox}>
        <p className={styles.commentTitle}>Comments</p>
        {comments?.map((comment) => comment._id && <p className={styles.comments} key={`${comment._id}`}>
          <span className={styles.commentauthor}><Link href={`/users/${comment.author.username}`}>{comment.author.username}</Link> </span>
          <span>{comment.comment}</span>
        </p>
        )}
      </div>
      <div className={styles.reactions}>
        {!liked ? <>
          <FavoriteBorderIcon className={`${styles.reactionIcons}  ${styles.likeIcon}`} onClick={handleLike} />
          <span className={styles.likesCounter}>{`${likesCounter} people like this`}</span></> :
          <>
            <FavoriteIcon className={`${styles.reactionIcons}  ${styles.likeIcon}`} onClick={handleDislike} />
            <span className={styles.likesCounter}>{`${likesCounter} people like this`}</span>
          </>}
      </div>

      <div className={styles.comment}>

        <InputEmoji
          className={styles.form}
          ref={formRef}
          value={newComment}
          onChange={setNewComment}
          cleanOnEnter
          onEnter={handleComment}
          placeholder="Type a message"
        />
        <form onSubmit={handleSubmit}  >
          <input className={styles.subButton} type="submit" />
        </form>
      </div>

    </article>

  );
};

export default Post;
