import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useState, useEffect } from 'react';
import Post from '../components/post/post'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
import styles from '../styles/userProfile.module.css'

const Followings = () => {

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const router = useRouter()

    const [posts, setPosts] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(2)

    useEffect(async () => {
        if (!auth.username) return router.push('/login', { query: 'a' })
        try {
            const response = await axiosPrivate.get('/posts/followings')
            setPosts(response.data.posts)
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
            setIsMounted(true)
        }
    }, [])


    const handleLoadMore = async () => {
        setIsLoading(true)
        try {
            const response = await axiosPrivate.get(`posts/followings/${page}`)
            if (response?.data?.posts) setPosts([...posts, ...response.data.posts])
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
    </main>);
}

export default Followings;