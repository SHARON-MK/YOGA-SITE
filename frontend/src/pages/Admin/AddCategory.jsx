import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { addCategoryAPI } from '../../api/adminAPI';

function AddCategory() {
  const [category, setCategory] = useState('');
  const navigate = useNavigate()

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const trimmedCategory = category.trim();
    

    if (trimmedCategory === '') {
      toast.error('Category name cannot be empty');
      return;
    }

    try {
      const response = await addCategoryAPI({ name: trimmedCategory });
      const {message, success} = response.data

      if (success) {
        toast.success(message);
        navigate('/admin/categories')
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while adding the category');
    }
  };

  return (
    <div className="p-6 artist_details-form">
      <h1 className="mb-9 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white category_heading">
        Add Category
      </h1>
      <form onSubmit={handelSubmit}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              value={category}
              onChange={handleCategoryChange}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer artistDetailsInput"
              placeholder="Category Name"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-5 mb-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 artistDetails_botton"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default AddCategory;
