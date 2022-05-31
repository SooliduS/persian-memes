import styles from "../styles/profile.module.css";
import Image from "next/image";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import EditIcon from '@mui/icons-material/Edit';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import useAuth from "../hooks/useAuth";
import profilePic from '../public/images/profile.jpg';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Link from 'next/link';

const Profile = () => {
  const { auth } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const router = useRouter()

  const [myUser, setMyUser] = useState({})
  const [isMounted, setIsMounted] = useState(false)
  const [bio, setBio] = useState('')
  const [activeEditBio, setActiveEditBio] = useState(false)


  useEffect(async () => {
    if (!auth.username) return router.push('/login', { query: 'a' })
    try {
      const response = await axiosPrivate.get('/profile')
      setMyUser(response.data)
      setBio(response.data.bio)
    } catch (e) {
      console.log(e)
    } finally {
      setIsMounted(true)
    }
  }, [])

  const handleSetBio = async () => {
    try {
      const response = await axiosPrivate.put(`/users/editprofile/${auth.id}`,
        JSON.stringify({ bio }))
      console.log(response.status)
    } catch (e) {
      console.log(e)
    } finally {
      setActiveEditBio(false)
    }
  }



  return (<main>
    {!isMounted ? <p>Loading...</p> :
      <section className={styles.container}>
        <div className={styles.imageContainer}>
          <Image className={styles.profilePic} src={myUser.profilePic ? myUser.profilePic : profilePic} />
          <CameraAltIcon className={styles.cameraIcon} />
        </div>
        <div className={styles.info}>
          <h3>{myUser.username}</h3>
          <button>Followers</button>
          <button>Followings</button>
          <div className={styles.bioContainer}>
            <TextareaAutosize
              className={styles.textarea}
              aria-label="bio"
              placeholder="Your bio... "
              style={{ width: 300 }}
              minRows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              disabled={!activeEditBio}
            />
            <div>
              <button onClick={handleSetBio}>set bio</button>
              <button onClick={() => setActiveEditBio(true)}>Edit</button>
            </div>

          </div>
          

        </div><Link href='/logout'><button>Logout</button></Link>
      </section>
    }
  </main>
  )
}

export default Profile;