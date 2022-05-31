import { useState , useEffect } from 'react'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import Post from '../../components/post/post'
import styles from '../../styles/userProfile.module.css'

const Tag = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const [page , setPage] = useState(2)
    const [posts , setPosts] = useState([])
    const [isMounted , setIsMounted] = useState(false)
    const [isLoading , setIsLoading] = useState(false)




    useEffect(async () => {
        if(!props?.tag) return
        try{
            const response = await axiosPrivate.get(`posts/tag/${props.tag}`)
            setIsMounted(true)
            if(response?.data?.posts) return setPosts([...response.data.posts])
            
            
        }catch(e){
            console.log(e)
            setIsMounted(true)

    }},[props])

    const handleLoadMore= async () => {
        try{
            const response = await axiosPrivate.get(`/posts/tag/${props.tag}/${page}`)
            setPosts([...posts, response.data.posts])
            setPage(page+1)
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
        }
    }


    return ( <> {!isMounted ? <p>Loading...</p> : 
        <main>

            <h3>{props.tag}</h3>
            <div className={styles.posts}>
                {posts.length===0 ? <p>No posts</p> :
                posts.map(post=>
                    <Post key={`${post._id}`} post={post} />
                )}
                <button onClick={handleLoadMore}>{isLoading ? <span>Loading...</span> : <span>Load more</span>}</button>
            </div>
        </main> 
    } </> );
}
 

export default Tag;

export const getStaticPaths = () => {
    return {
        fallback: true,
        paths: []
    }
}

export function getStaticProps(context) {
    
    return ({
        props:{tag:context.params.tag}
    })

}