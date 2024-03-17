import React, { useState } from 'react';

function Category({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Technology', 'Travel', 'Food', 'Fashion', 'Education','Other'];

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    console.log(category); // Log the selected category
    onChange(category);
  };

  return (
    <div>
      <div>
        <h2 className='font-semibold py-1 text-xl outline-none'>Categories</h2>
        <select onChange={handleCategoryChange} className='p-1 bg-black text-white border-2 my-1 font-semibold border-gray-300' value={selectedCategory}>
          {categories.map((category, index) => (
            <option className='font-semibold outline-none' key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Category;
