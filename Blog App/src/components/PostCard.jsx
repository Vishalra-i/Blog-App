import React from 'react';
import appwriteService from '../appwrite/config';
import {Link} from 'react-router-dom';

function Postcard({$id ,title,featuredImage}) {
  return (
    <Link to={`/post/${$id}`} >
       <div className='w-full p-4 bg-gray-100 rounded-xl'>
         <div className="w-full justify-center mb-4">
           <img src={`${appwriteService.getFilePreview(featuredImage)}`}
           className='w-full h-[200px] object-cover rounded-xl'
           alt={title} 
           />
           <h2 className='text-xl font-bold'>{title}</h2>
         </div>

       </div>
    </Link>
  )
}

export default Postcard