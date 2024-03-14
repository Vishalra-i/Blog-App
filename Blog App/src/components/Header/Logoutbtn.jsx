import React from 'react'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import {  useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'


function Logoutbtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logoutHandler = ()=>{
       authservice.logout()
       .then(
        dispatch(logout())
       )
       .catch(
        err=>console.log(err)
        )
       .finally(
        navigate('/login')
       )

    }
    
  return (
    <button className='inline-block  px-4 py-2 text-white text-[16px]  bg-blue-500 hover:bg-blue-200 duration-200 rounded-3xl ' onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default Logoutbtn