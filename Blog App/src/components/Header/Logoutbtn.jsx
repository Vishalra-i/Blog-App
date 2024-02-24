import React from 'react'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import {  useDispatch } from 'react-redux'


function Logoutbtn() {
    const dispatch = useDispatch()

    const logoutHandler = ()=>{
       authservice.logout().then(
        dispatch(logout())
       ).catch(err=>console.log(err))

    }
    
  return (
    <button className='inline-block bg-blue-500 hover:bg-blue-200 duration-200 rounded-2xl ' onClick={logoutHandler}>
        Logout
    </button>
  )
}

export default Logoutbtn