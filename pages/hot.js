import { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Post from '../components/post/post'
import styles from '../styles/userProfile.module.css'

const Hot = () => {

    const axiosPrivate = useAxiosPrivate()

    const [posts, setPosts] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(2) 

    useEffect( async () => {
        try {
            const response = await axiosPrivate.get('/posts/hot')
            setPosts(response.data.posts)
        } catch (e) {
            console.log('error : ' , e)
        } finally {
            setIsLoading(false)
            setIsMounted(true)
        }
    }, [])

    const handleLoadMore = async () => {
        setIsLoading(true)
        try {
            const response = await axiosPrivate.get(`/posts/hot/${page}`)
            setPosts([...posts, ...response.data.posts])
            setPage(page + 1)
        } catch (e) {
            console.error(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (<main className={styles.container}>
        {!isMounted ? <p>Loading...</p> :
            <div className={styles.posts}>
                {posts?.length ? posts.map(post =><Post key={`${post._id}`} post={post}/>) :<p>no post yet</p>}
                <button onClick={handleLoadMore}>{!isLoading ? <span>load more</span> : <span>Loading...</span>}</button>
            </div>
        }
    </main>) ;
}

export default Hot;