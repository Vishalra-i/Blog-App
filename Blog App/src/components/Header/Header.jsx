import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Logo, Logoutbtn } from "../index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars , faX } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true,
    }, {
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
      name: "Trending",
      slug: "/all-posts",
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 px-10 backdrop-blur-md z-[10000000000] bg-transparent drop-shadow-xl shadow-md shadow-green-400 fixed top-0 w-screen flex items-center justify-between'>
      {/* NAVIGATION */}
      <nav className='flex gap-4 items-center'>
        {/* Mobile Menu Icon */}
        <div className="sm:hidden">
          <FontAwesomeIcon  icon={showDropdown ? faX  : faBars}   onClick={() => setShowDropdown(!showDropdown)} />
          {showDropdown && (
            <div className="absolute top-14 left-0 w-40 bg-white font-semibold  border border-gray-200 shadow-lg rounded-md">
              <ul className='flex gap-4 flex-col p-2'>
                {navItems.map((item) => 
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.slug)}
                        className={`py-2 px-4 hover:bg-gray-300 w-full font-bold text-left`}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <Logoutbtn/>
                </li>
              </ul>
            </div>
          )}
        </div>
        
        {/* Logo */}
        <div className='mr-4'>
          <Link to='/'>
            <Logo width='70px' />
          </Link>
        
        </div>
        </nav>

        {/* Desktop Menu */}
        <div>
        <ul className='sm:flex ml-auto gap-5 text-xl hidden font-bold'>
          {navItems.map((item) => 
            item.active && (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className={`px-6 py-2 hover:bg-green-300 rounded-full`}
                >
                  {item.name}
                </button>
              </li>
            )
          )}
        </ul>
        </div>
      

      {/* Additional Options */}
      <div>
        <ul className='flex gap-5'>
          {/* Authenticated User Options */}
          {authStatus && (
            <>
              <li>
                <button onClick={() => navigate('/add-post')} className={`inline-bock px-4 mt-1 py-2 hover:bg-purple-300 text-white bg-purple-500 rounded-full `}>
                  📝 Write
                </button>
              </li>
              <li>
                <Link to={'/userprofile/:Id'}>
                  <img width="50" height="50" className='border-2 rounded-full hover:border-green-400  border-black' src="https://img.icons8.com/bubbles/50/user.png" alt="user"/>
                </Link>
              </li>
            </>
          )}
          </ul>
      </div>
          
        {/* Unauthenticated User Options */}
          {!authStatus && (
            <>
             <div>
             <ul className='flex gap-5'>
              <li className='sm:hidden'>
                <button
                  onClick={() => navigate("/login")}
                  className={`px-6 py-2 hover:bg-green-300 font-bold rounded-full`}
                >
                  Login
                </button>
              </li>
              <li className='sm:hidden'>
                <button
                  onClick={() => navigate("/signup")}
                  className={`px-6 py-2 hover:bg-green-300 font-bold rounded-full`}
                >
                  Signup
                </button>
              </li>
              </ul>
             </div>
            </>
          )}
        
    </header>
  );
}

export default Header;
