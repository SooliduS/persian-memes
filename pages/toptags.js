import {useState , useEffect} from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Chip from '@mui/material/Chip';
import Link from 'next/link'
import styles from '../styles/topTags.module.css'


const TopTags = () => {
    const axiosPrivate = useAxiosPrivate()

    const [tags , setTags] = useState([])
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading , setIsLoading] = useState(true)
    const [page , setPage] = useState(2)

    useEffect( async ()=> {
        try{
            const response = await axiosPrivate.get('/tags/all')
            setTags([...response.data.tags])
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false)
            setIsMounted(true)
        }
        
    },[])

    const handleLoadMore = async () => {

    }


    return ( <main className={styles.container}>
        <div>
            {tags.map(tag =><span key={tag._id}><Link href={`tags/${tag.tagName}`}><Chip label={tag.tagName} onClick={()=>{}}/></Link></span>)}
        </div>
        <button onClick={handleLoadMore}>Load More</button>
    </main> );
}
 
export default TopTags;