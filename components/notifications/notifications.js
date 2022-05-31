import styles from './notifications.module.css'
import CommentNotif from './commentNotif';
import FriendRequestNotif from './friendRequestNotif'
import LikeNotif from './likeNotif'
import useNotifs from '../../hooks/useNotifs'

const Notifications = () => {
    const {notifs} = useNotifs();


    return (<section className={styles.container}>
        <ul>
            {notifs.map(notification => {
                if (notification.notifType === 1) return <FriendRequestNotif key={notification._id} notification={notification} />
                if (notification.notifType === 2) return <LikeNotif key={notification._id} notification={notification} />
                if (notification.notifType === 3) return <CommentNotif key={notification._id} notification={notification} />
            })}
        </ul>
    </section>);
}

export default Notifications;

