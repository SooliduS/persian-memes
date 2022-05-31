//import dynamic from 'next/dynamic'
//import {useState , useEffect} from 'react'
import Notifications from '../components/notifications/notifications'

//const EmojiPicker = dynamic(()=>import('../components/emojiPicker/EmojiPicker') , {ssr:false})

const Test = () => {


    return (<div>
                <p>salam</p>
        <Notifications />

    </div> );
}
 
export default Test;