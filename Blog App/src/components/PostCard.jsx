import React from 'react';
import appwriteService from '../appwrite/config';
import parse from "html-react-parser";
import { Link } from 'react-router-dom';

function Postcard({ $id, title, featuredImage, author, $createdAt, content, width = "min-w-full" }) {
  
  const formatDate = (dateString) => {
    // Format the date string using Date object or a library like date-fns or moment.js
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getPreviewContent = (content) => {
    // Split the content by newline characters
    const lines = content.split(' ');
    // Select the first two lines and join them back with newline characters
    return lines.length > 1 ? lines.slice(0, 40).join(' ') : content;
  };

  return (
    <Link to={`/post/${$id}`} className="hover:no-underline">
      <div className={` ${width} min-h-full p-4 bg-black text-white shadow-xl shadow-green-400 rounded-xl box-border transition-transform transform hover:scale-105`}>
        <div className="min-w-fit flex flex-col justify-between mb-4">
          <div className='flex flex-col justify-between '>
              <div>
              <h2 className='font-bold text-3xl mb-2'>{title}</h2>
              </div>
            <div  className='flex flex-col justify-between items-center'>
            <img
              className='rounded-xl w-full py-2 object-cover  h-36 ml-4'
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              />
            <div>
              <p className='font-semibold text-xl md:text-md mb-2'>{parse(getPreviewContent(content))}</p>
              <p className="text-lg hover:text-gray-600 text-gray-400 mb-2">Read more...</p> {/* Add Read more link */}
              <h3 className="font-bold text-xs mb-1"><span className="text-red-500">Author:</span> {author}</h3>
              <h3 className="font-bold text-xs mb-1"><span className="text-red-500">Created At:</span> {formatDate($createdAt)}</h3>
            </div>
          </div>
            </div>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
