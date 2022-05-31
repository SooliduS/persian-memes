import Link from 'next/link'
import styles from './botNavbar.module.css'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HotTubIcon from '@mui/icons-material/HotTub';
import UpdateIcon from '@mui/icons-material/Update';
import TagIcon from '@mui/icons-material/Tag';
import PersonIcon from '@mui/icons-material/Person';

const BotNavbar = () => {
    return ( <section className={styles.container}>
        <Link href='/profile'><div><PersonIcon /></div></Link>
        <Link href='/followings'><div><EmojiPeopleIcon /></div></Link>
        <Link href='/hot' ><div><HotTubIcon /></div></Link>
        <div><UpdateIcon /></div>
        <Link href='/toptags'><div><TagIcon /></div></Link>
    </section> );
}
 
export default BotNavbar;