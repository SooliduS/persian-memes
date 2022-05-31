import axios from '../api/axios'
import {useState , useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import useNotifs from '../hooks/useNotifs'
import {useRouter} from 'next/router'

const Logout = () => {

    const router = useRouter()
    const {setAuth} = useAuth()
    const {setNotifs} = useNotifs()
    
    const [success , setSuccess] = useState(false)
    const [errMsg , setErrorMsg] = useState('Please wait ...')

    useEffect( async ()=>{
        try {
            await axios.get('/logout')
            setAuth({})
            setNotifs([])
            setSuccess(true)
            setTimeout(()=>router.push('/') , 1000)
        }catch(e){
            setErrorMsg('Something went wrong')
        }
    } ,[])

    return ( 
        <>{
            success ? <p>successfully signed out</p> :
            <p>{errMsg}</p>
        }</>
     );
}
 
export default Logout;