import { createContext, useState } from "react";
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useEffect } from 'react';

const NotifsContext = createContext({});

export const NotifsProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()

    const [notifs, setNotifs] = useState([])
    const [showNotifs , setShowNotifs] = useState(false)

    useEffect(async () => {
        if (!auth.username) return
        try {
            const response = await axiosPrivate.get('/notifications')
            setNotifs([...response.data.notifications])
        } catch (e) {
            console.log(e.message)
        }
    }, [auth.username])

    return (
        <NotifsContext.Provider value={{ notifs, setNotifs , showNotifs ,setShowNotifs }}>
            {children}
        </NotifsContext.Provider>
    )
}

export default NotifsContext;