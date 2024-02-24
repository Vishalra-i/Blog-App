import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authservice from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer } from './components'


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
    <div className="App">
      <Headers/>
      <Footer/>
    </div>
  ) : (
    <div className="flex flex-col bg-neutral-300 w-56 h-64 animate-pulse rounded-xl p-4 gap-4">
       <div className="bg-neutral-400/50 w-full h-32 animate-pulse rounded-md"></div>
       <div className="flex flex-col gap-2">
       <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
       <div className="bg-neutral-400/50 w-4/5 h-4 animate-pulse rounded-md"></div>
       <div className="bg-neutral-400/50 w-full h-4 animate-pulse rounded-md"></div>
       <div className="bg-neutral-400/50 w-2/4 h-4 animate-pulse rounded-md"></div>
       </div>
    </div>
  )
}

export default App
