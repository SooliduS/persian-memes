import { useState, useEffect} from 'react'
import axios from '../../api/axios'
import styles from './search.module.css'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search';

const Search = () => {
    const [val, setVal] = useState('')
    const [results, setResults] = useState([])

    useEffect(async () => {
        if (val === '') return
        try {
            const response = await axios.get(`users/search/${val}`)
            setResults([...response.data.arr])
        } catch (e) {
            console.log(e)
        }
    }, [val])

    const handleBlur = () => {
        if (val === '') return
        return setTimeout(()=>setVal('') , 100)
    }

    return (<section className={styles.container} onBlur={handleBlur}  >
        <ul className={styles.searchContainer}  >
            <li>
                <form onSubmit={(e) => e.preventDefault}>
                    <label className={styles.offscreen} htmlFor="search" >search</label>   
                    <input className={styles.searchInput} type="search" id="search" value={val} onChange={(e) => setVal(e.target.value.toLowerCase())} />
                    <SearchIcon />
                </form>
            </li >
            {val !== '' && results.map((result) =>
                <li  className={styles.result} onClick={handleBlur} key={result.id}><Link href={`/users/${result.username}`}>{`${result.username}`}</Link></li> 
            )}
        </ul>
    </section>


    );
}

export default Search;