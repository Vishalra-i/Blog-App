import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container } from '../components'

function Error() {
  return (
    
        <div className='flex justify-center items-center flex-col gap-5 h-screen'>
        <h1 className='text-3xl font-bold'>404 Not Found</h1>
        <p className='text-lg font-semibold whitespace-nowrap'>The page you are looking for does not exist.</p>
        <p className='text-lg  font-semibold whitespace-nowrap'>Please try again later or return to the home page.</p>
        <Link to={'/'}>
            <Button className='text-center' children={"Home"}  />
        </Link>

        </div>
  
  )
}

export default Error