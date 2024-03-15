import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Logoutbtn , Logo , Container} from "../index"





function Header() {
     const authStatus = useSelector((state)=>state.auth.status)
     const navigate = useNavigate()

     
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  {
      name: "User Profile",
      slug: "/userprofile/:Id",
      active: authStatus,
  },
  ]


  return (
    <header className='py-3 px-10 backdrop-blur-md  z-[10000000000] bg-transparent drop-shadow-xl shadow-md shadow-green-400 fixed top-0 w-screen flex item-center justify-between'>
      {/* //LOGO  */}
        <nav className='flex  self-center'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          </nav>
          
          <div>
          <ul className='flex ml-auto gap-5 text-xl font-bold'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                onClick={() => navigate(item.slug)}
                className={`inline-bock px-6 py-2 duration-200 hover:bg-green-300 rounded-full `}
                >{item.name}</button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <Logoutbtn />
              </li>
            )}
          </ul>
          </div>
    </header>
  )
}

export default Header