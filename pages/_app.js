import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthContext'
import { NotifsProvider } from '../contexts/NotifsContext'
import Layout from '../components/layout/layout'



function MyApp({ Component, pageProps }) {


  return (
    <AuthProvider>
      <NotifsProvider>
        <Layout>
          <Component  {...pageProps} />
        </Layout>
      </NotifsProvider>
    </AuthProvider>
  )
}

export default MyApp
