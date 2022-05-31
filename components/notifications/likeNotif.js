import Link from 'next/link'

const LikeNotif = ({notification}) => {
    return ( <Link href={`/post/${notification.postId}`}>
            <li>
                {`${notification.opponent} liked your post`}
                {!notification.visited && <div className='notVisitedBadge'></div>}
            </li>
    </Link > );
}
 
export default LikeNotif;