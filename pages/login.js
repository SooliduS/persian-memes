import { useRef, useState, useEffect } from 'react';
import styles from "../styles/form.module.css"
import axios from '../api/axios';
import {useRouter} from 'next/router'
import useAuth from '../hooks/useAuth'

const Login = () => {
    const { setAuth , auth } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const router = useRouter()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    

    useEffect( ()=>{
        if(auth.username)
            return setTimeout(()=>router.push(router.asPath.split('?')[1] ? router.asPath.split('?')[0] : '/') , 1000 ) 
    },[auth])

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login',
                JSON.stringify({ username, password })
            );
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            const id = response?.data?.id;
            const profilePic = response?.data?.profilePic;
            setAuth({ username, roles, accessToken , id , profilePic });
            setUsername('');
            setPassword('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else setErrMsg(err.message)
            errRef.current.focus();
        }
    }

    return (
        <main className={styles.layout}>
            {success ? (
                <section className={styles.container}>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section >
            ) : (
                <section className={styles.container} >
                    <p ref={errRef}  aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username:</label>
                            <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>
                        <button>Login</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign Up</a>
                        </span>
                    </p>
                </section>
            )}
        </main>
    )
}

export default Login
