import TopNavbar from '../navbars/topNavbar'
import LeftNavbar from '../navbars/leftNavbar'
import BotNavbar from '../navbars/botNavbar'
import useRefreshToken from '../../hooks/useRefreshToken'
import { useEffect, useRef } from 'react'
import useAuth from '../../hooks/useAuth'
import Notifications from '../notifications/notifications'
import useNotifs from '../../hooks/useNotifs'
import useAxiosPrivate from '../../hooks/useAxiosPrivate'

export default function Layout({ children }) {

  const { persist, setPersist } = useAuth()
  const refresh = useRefreshToken()
  const { showNotifs, setShowNotifs, setNotifs } = useNotifs()
  const notifRef = useRef()
  const axiosPrivate = useAxiosPrivate()

  useEffect(async () => {

    if (!persist) return
    try {
      await refresh()
    } catch (e) {
      console.log(e.message)
    } finally {
      setPersist(false)
    }

  }, [])

  useEffect(async () => {
    if (!showNotifs) return
    notifRef.current.focus()
  }, [showNotifs])

  const handleBlur = async (e) => {
    const currentTarget = e.currentTarget;
    requestAnimationFrame(async () => {
      if (!currentTarget.contains(document.activeElement)) {
        setShowNotifs(false)
        try {
          await axiosPrivate.get('/notifications/updatevisited')
          const response = await axiosPrivate.get('/notifications')
          setNotifs(response.data.notifications)
        } catch (e) {
          console.log(e.message)
        }
      }
    });
  }

  return (
    <>
      <div className="container">
        <LeftNavbar />
        <div className="content-container">
          <div className="pages-container">
            <TopNavbar />
            <div>
              <main>{children}</main>
              <div className="notifContainer" tabIndex="0" onBlur={handleBlur} ref={notifRef}> {showNotifs && <Notifications />}</div>
            </div>
          </div>
        </div>
        <div className="ads xxlarge">Ads</div>

      </div>
      <BotNavbar />
    </>
  )
}      