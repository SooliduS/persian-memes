import useAxiosPrivate from '../../hooks/useAxiosPrivate'
import { useEffect, useState } from 'react'
import styles from './friendRequestNotif.module.css'

const FriendRequestNotif = ({ notification }) => {
    const axiosPrivate = useAxiosPrivate()

    const [followAproved, setFollowAproved] = useState(notification.aproved)
    const [deleteAproved, setDeleteAproved] = useState(false)

    useEffect( async ()=>{
        //check if backend error happened
    },[followAproved,deleteAproved])

    const handleAccept = async () => {
        try {
            const response = await axiosPrivate.post('/follow/aprove', {
             id: notification.opponentId 
            })
            console.log(response)
            return setFollowAproved(true)
        } catch (e) {
            console.log(e)
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.post('/follow/delete', {id: notification.opponentId })
            console.log(response)
            setDeleteAproved(true)
        } catch (e) {
            console.log(e)
        }
    }

    return (<li className={styles.container}>
        <div>{`${notification.opponent} sent a friend request`}
            {
                !deleteAproved && followAproved === false ?
                    <button onClick={handleAccept}>Accept</button> :
                    <button onClick={handleDelete}>Undo</button>
            }
            {
                deleteAproved && <span>Deleted</span>    

            }
            {!notification.visited && <div className='notVisitedBadge'></div>}
            </div>
    </li >);
}

export default FriendRequestNotif;