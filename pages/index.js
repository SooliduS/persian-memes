import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Post from '../components/post/post'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import {useState , useEffect , useContext} from 'react'
import AuthContext from '../contexts/AuthContext'
import NewPost from '../components/post/newpost'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import AddBoxIcon from '@mui/icons-material/AddBox';

export default function Home() {
  
  const {persist , auth} = useContext(AuthContext)
  const [page , setPage] = useState(1)
  const [posts , setPosts] = useState([])
  const [isLoading , setIsLoading] = useState(true)
  const [addPostActive , setAddPostActive] = useState(false)
  const [newPostAdded , setNewPostAdded] = useState(false)
  const axiosPrivate =useAxiosPrivate()

  useEffect(async ()=>{
    if(persist) return 
    try{
      const response = await axiosPrivate.get(`/public`)
      const posts = response.data.posts
      setPosts(posts)
      setIsLoading(false)
      setPage(2)
    }catch(err){
      console.log(err)
      setIsLoading(false)
    }
  } ,[persist])

  useEffect( async ()=>{
    if(newPostAdded === false) return 
    setAddPostActive(false)
    setIsLoading(true)
    try{
      const response = await axiosPrivate.get(`/public`)
      const posts = response.data.posts
      setPosts(posts)
    }catch(e){
      console.log(e)
    }finally{
      setIsLoading(false)
    }

  },[newPostAdded])

  const handleLoadMore = async ()=>{
    setIsLoading(true)
    try{
      const response = await axiosPrivate.get(`/public/${page}`)
      const newPosts = response.data.posts
      setPosts([...posts, ...newPosts])
      setIsLoading(false)
      setPage(prev=>prev+1)
    }catch(err){
      console.log(err)
      setIsLoading(false)
    }

  }

  return (<>
    <Head>
      <title>Persian memes</title>
      <meta name="viewport" content="width=device-width, initial-scale"/>
      <meta name="description" content="Let's have fun together iranian buddies"/>
    </Head>
    <main  className={styles.container} >

      {auth.accessToken && 
      <div className={styles.addPostContainer}>
          <AddBoxIcon  onClick={()=>setAddPostActive(true)} className={!addPostActive ? styles.addPostIcon : styles.addPostIconDeactive}/>
          <div className={addPostActive ? styles.addPost : styles.addPostDeactive}><NewPost setNewPostAdded={setNewPostAdded}/></div>
          <IndeterminateCheckBoxIcon onClick={()=>setAddPostActive(false)} className={addPostActive ? styles.addPostIcon : styles.addPostIconDeactive}/>
      </div>
      }

      <div className={styles.posts}>
        {posts.length ? posts.map(post =><Post key={`${post._id}`} post={post}/>) :!isLoading && <p>no post yet</p>}
        <button onClick={handleLoadMore}>{isLoading ? 'Loading...' : 'Load more'}</button>
      </div>
      
    </main>
    </>
  )
}

