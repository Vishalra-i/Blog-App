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
    return lines.length > 1 ? lines.slice(0, 10).join(' ') : content;
  };

  return (
    <Link to={`/post/${$id}`} className="hover:no-underline">
      <div className={` ${width} min-h-full p-4 bg-white text-black shadow-md shadow-slate-400 rounded-xl box-border transition-transform transform hover:scale-105`}>
        <div className="min-w-fit flex flex-col justify-between mb-4">
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='font-bold text-4xl mb-2'>{title}</h1>
              <p className='font-semibold text-xl mb-2'>{parse(getPreviewContent(content))}</p>
              <p className="text-base hover:text-gray-600 text-gray-400 mb-2">Read more...</p> {/* Add Read more link */}
              <h3 className="font-bold text-sm mb-1"><span className="text-red-500">Author:</span> {author}</h3>
              <h3 className="font-bold text-sm mb-1"><span className="text-red-500">Created At:</span> {formatDate($createdAt)}</h3>
            </div>
            <img
              className='rounded-xl object-cover w-36 h-36 ml-4'
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
