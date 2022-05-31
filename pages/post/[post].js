import styles from '../../styles/userProfile.module.css'
import {useState , useEffect} from 'react'
import Post from '../../components/post/post'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

const Posts = (props) => {
    const axiosPrivate = useAxiosPrivate()

    const [post , setPost] = useState({})
    const [isLoading , setIsLoading] = useState(true)

    useEffect(async () =>{
        if(!props.postId) return
        const response = await axiosPrivate.get(`/posts/post/${props.postId}`)
        setPost(response.data.post)
        setIsLoading(false)
    },[props.postId])

    return ( <main className={styles.container}>
        {
        isLoading ? <p>Loading...</p> : 
        <Post post={post} />
        }
    </main> );
}
 
export default Posts;

export const getStaticPaths = () => {
    return {
        fallback: true,
        paths: []
    }
}

export function getStaticProps(context) {
    
    return ({
        props:{postId:context.params.post}
    })

}