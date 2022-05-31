import styles from './topNavbar.module.css'
import Search from '../search/search'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import useNotifs from '../../hooks/useNotifs'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth'

const TopNavbar = () => {
    const { notifs, setNotifs, showNotifs, setShowNotifs } = useNotifs()
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const handleShowNotifs = async () => {
        if (!showNotifs) return setShowNotifs(true)
        setShowNotifs(false)
        try {
            await axiosPrivate.get('/notifications/updatevisited')
            const response = await axiosPrivate.get('/notifications')
            setNotifs(response.data.notifications)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <section className={styles.container}>
            <Search />
            {auth.username &&
                    <div className={styles.notifications}>
                        <NotificationsNoneIcon className={styles.icon} onClick={handleShowNotifs} />
                        {
                            notifs?.filter(notif => notif.visited === false).length > 0 ?
                                <div className={styles.badge}>{notifs?.filter(notif => notif.visited === false).length}</div> :
                                <div className={styles.badge2}></div>
                        }
                </div>}
        </section>
    );
}

export default TopNavbar;