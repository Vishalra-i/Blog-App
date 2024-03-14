import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer , Header} from './components'
import Login from './components/Login'
import Postform from './components/Postform/Postform'
import { Outlet } from 'react-router-dom'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
     authservice.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else(
        dispatch(logout())
      )
    }).finally(
      setLoading(false)
    )
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between '>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default App
