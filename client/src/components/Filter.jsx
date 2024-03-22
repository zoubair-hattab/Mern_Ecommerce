import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { urlServer } from '../urlServer';

const Filter = ({ setCategory, setSearch, setOrder }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await axios.get(`/api/category/getcategories`);

        setCategories(res.data.message);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadCategory();
  }, [name]);
  return (
    <div className=" flex flex-col gap-4 sm:flex-row sm:gap-0  mb-5">
      <select
        className="flex-2 bg-gray-50 border border-gray-300 border-r-0
         text-gray-900 text-sm rounded-l-lg 
         focus:outline-none
         block  p-4"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option defaultValue value={''}>
          Choose a Category
        </option>
        {categories?.map((item) => (
          <option
            key={item._id}
            value={'category=' + item.name}
            className="h-2"
          >
            {item.name}
          </option>
        ))}
      </select>

      <input
        type="search"
        className="bg-gray-50  flex-1 border  border-gray-400
         text-gray-900 text-sm
         focus:outline-none
           block  p-4 "
        placeholder="Search your product"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        id="countries"
        className=" bg-gray-50 border flex-2 border-gray-400 border-l-0
        text-gray-900 text-sm rounded-r-lg 
        focus:outline-none

        block  p-4"
        onChange={(e) => setOrder(e.target.value)}
      >
        <option defaultValue value={''}>
          {' '}
          Sort By
        </option>
        <option value="">Newest</option>
        <option value="sort=oldest">Oldest</option>
        <option value="sort=-sold">Best sales</option>
        <option value="sort=-price">Price: Hight-Low</option>
        <option value="sort=price">Price: Low-Hight</option>
      </select>
    </div>
  );
};

export default Filter;
