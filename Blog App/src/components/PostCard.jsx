import React, { useState } from 'react';
import appwriteService from '../appwrite/config';
import authservice from '../appwrite/auth';
import {Link} from 'react-router-dom';

function Postcard({$id ,title,featuredImage ,author , width="min-w-fit"}) {
  
  
  return (
    <Link to={`/post/${$id}`} >
       <div className={` ${width} p-4 bg-green-800 text-white rounded-xl`}>
         <div className="min-w-fit justify-center mb-4">
           <h1 className=' font-bold p-2 text-4xl'>{title}</h1>
           <img src={`${appwriteService.getFilePreview(featuredImage)}`}
           className='rounded-xl'
           alt={title} 
           />

         <h3 className="font-bold text-xl py-5 px-2"><span className="text-red-500">Author:</span> {author}</h3>
         </div>

       </div>
    </Link>
  )
}

export default Postcard