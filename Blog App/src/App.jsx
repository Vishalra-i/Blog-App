import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer , Header} from './components'
import Login from './components/Login'
import Postform from './components/Postform/Postform'
import { Outlet } from 'react-router-dom'
import Loading from './pages/Loading'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // const themeMode = useSelector((state) => state.themeMode);

  // const handleToggleTheme = () => {
  //   dispatch(themeMode);
  // };
  useEffect(() => {
     authservice.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else(
        dispatch(logout())
      )
    }).finally(
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    )
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex bg-[#FAF9F6] flex-wrap content-between '>
      {/* <button className='bg-[#EDEADE] text-black left-52 absolute top-20 ' onClick={handleToggleTheme}>Toggle</button> */}
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
     <div className='flex justify-center items-center h-screen'>
      <Loading/>
    </div>
  )
}

export default App
