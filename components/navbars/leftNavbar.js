import styles from './leftNavbar.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from '../../api/axios'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HotTubIcon from '@mui/icons-material/HotTub';
import UpdateIcon from '@mui/icons-material/Update';
import TagIcon from '@mui/icons-material/Tag';
import ProfilePic from '../profilePic/profilePic'
import useAuth from '../../hooks/useAuth'


const LeftNavbar = () => {

    const { auth } = useAuth()

    const [tags, setTags] = useState([])

    useEffect(async () => {
        try {
            const response = await axios.get('/tags')
            setTags(response.data.tags)
        } catch (e) {
            console.log(e)
        }
    }, [])

    return (<section className={styles.container}>
        <Link href='/' ><div className={styles.logo}><h2>Logo</h2></div></Link>
        <div className={styles.common}>
            <ul>
                <li><Link className={styles.link} href='/followings'><div className={styles.listItem}><EmojiPeopleIcon /><span className="xlarge">Followings</span></div></Link></li>
                <li><Link className={styles.link} href='/hot'><div className={styles.listItem}><HotTubIcon /><span className="xlarge">Hot</span></div></Link></li>
                <li><div className={styles.listItem}><UpdateIcon /><span className="xlarge">New</span></div></li>
                <li><Link className={styles.link} href='/toptags'><div className={styles.listItem}><TagIcon /><span className="xlarge">Tags</span></div></Link></li>
                <ul className={styles.tags}>
                    {tags?.map(tag => <li className='xlarge' key={tag._id}><Link className={styles.link} href={`/tags/${tag.tagName}`}><span className={styles.link}>{`#${tag.tagName}`}</span></Link></li>)}
                </ul>
            </ul>
        </div>
        <div className={`${styles.profile} xlarge`}>
            <div className={styles.profileButton}>
                {
                    auth.username ?
                        <><Link href="/profile"><div className={styles.profilePic}><ProfilePic /></div></Link>
                            <div><span>{auth.username}</span><Link href="/logout">Log out</Link></div></> :
                        <> <Link href="/signup"><li>Sign up</li></Link>
                            <div className={styles.devider} />
                            <Link href="/login"><li>Login</li></Link></>
                }

            </div>
        </div>
        <div className={`${styles.profile}  medium`}>
            {
                auth.username?
                <div className={styles.mediumProfile}><Link href='/profile'><div className={styles.profilePic}><ProfilePic /></div></Link></div> :
                <div className={styles.medium}><Link href='/login'>Login</Link></div>
            }
        </div>
    </section>);
}

export default LeftNavbar;