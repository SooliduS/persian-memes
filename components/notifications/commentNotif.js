import Link from 'next/link'

const CommentNotif = ({notification}) => {
    return ( <Link href={`/post/${notification.postId}`}>
            <li>
                {`${notification.opponent} commented on your post`}
                {!notification.visited && <div className='notVisitedBadge'></div>}
            </li>
    </Link > );
}
 
export default CommentNotif;