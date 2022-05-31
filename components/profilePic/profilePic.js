import Image from 'next/image'
import profilePic from '../../public/images/profile.jpg';
import styles from './profilePic.module.css';
import useAuth from '../../hooks/useAuth'

const ProfilePic = () => {

    const {auth} = useAuth()
    return ( <div className={styles.profilePic}>
        <Image src={auth.profilePic ? auth.profilePic : profilePic}  />
    </div> );
}
 
export default ProfilePic;