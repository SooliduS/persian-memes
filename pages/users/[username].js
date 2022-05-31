import styles from '../../styles/userProfile.module.css'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from '../../api/axios'
import Post from '../../components/post/post'
import Error from 'next/error'
import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'

const Users = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()


    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [page, setPage] = useState(2)
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isFollowed, setIsFollowed] = useState(false)
    const [isRequested, setIsRequested] = useState(false)
    const [isRequesting , setIsRequesting] = useState(false)


    useEffect(() => {
        setIsMounted(false)
        setPosts([])
    }, [props])

    useEffect(async () => {
        if (!props.id) return
        if(!isRequesting) return
        try {
            const response = await axiosPrivate.get('/profile')
            console.log('log :', response.data)
            if (!response.data.followings.includes(props.id) && !response.data.requestsSent.includes(props.id)) return
            if (response.data.followings.includes(props.id)) setIsFollowed(true)
            if (response.data.requestsSent.includes(props.id)) setIsRequested(true)

        } catch (e) {
            console.log(e)
        }
    }, [props , isRequesting])

    useEffect(async () => {
        if (!props?.id) return
        try {
            const response = await axiosPrivate.get(`/posts/${props.id}`)
            if (response.data?.posts) { setPosts([...response.data.posts]) }

        } catch (error) {
            setError(error)
        } finally {
            setIsMounted(true)
            setIsLoading(false)
        }

    }, [props])

    const handleFollowRequest = async () => {
        try {
            const response = await axiosPrivate.post('/follow/request', { id: props.id })
        } catch (error) {
            console.log(error.message)
        }finally{
            setIsRequesting(true)
        }
    }

    const handleLoadMore = async () => {
        setIsLoading(true)
        const response = await axiosPrivate.get(`/posts/${props.id}/${page}`)
        if (response?.data?.posts) setPosts([...posts, ...response.data.posts])
        setPage(page + 1)
        setIsLoading(false)
    }

    return (<>{!isMounted ? <p>Loading...</p> : error ? <Error statusCode={error.status} /> : <main className={styles.container}>
        <h3>{props.username}</h3>
        <pre>{props.bio}</pre>
        {!isFollowed && !isRequested && props.username !== auth.username && <button onClick={handleFollowRequest}>Follow</button>}
        {!isFollowed && isRequested && props.username !== auth.username && <button >Request Sent</button>}
        {isFollowed && props.username !== auth.username && <button >Already Followed</button>}
        <br />
        <div className={styles.posts}>
            {posts.length !== 0 ? posts.map(post => <Post post={post} key={`${post._id}`} />) : <p>no post yet</p>}
            <button onClick={handleLoadMore}>{!isLoading ? <span>Load more...</span> : <span>Loading...</span>}</button>
        </div>
    </main>} </>);
}

export default Users;

export const getStaticPaths = () => {
    return {
        fallback: true,
        paths: []
    }
}

export async function getStaticProps(context) {
    try {
        const response = await axios.get(`/users/${context.params.username}`)
        return {
            props: { ...response.data }
        }
    } catch (e) {
        return {
            props: { error: e }
        }
    }

}
