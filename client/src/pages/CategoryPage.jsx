import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { urlServer } from '../urlServer';
import { loadProduct } from '../redux/actions/productAction';
import { useDispatch } from 'react-redux';

const CategoryPage = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await axios.get(`${urlServer}/category/getcategories`);

        setCategories(res.data.message);
      } catch (error) {
        console.log(error.message);
      }
    };
    loadCategory();
  }, [name]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${urlServer}/category/create-category`,
        { name },
        {
          withCredentials: true,
        }
      );
      setCategories([...categories, res.data.message]);
      setName('');
    } catch (error) {
      console.log(error.message);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${urlServer}/category/delete/${id}`, {
        withCredentials: true,
      });
      const newArray = categories.filter((item) => item._id != id);
      setCategories(newArray);
      await dispatch(loadProduct());
    } catch (error) {
      console.log(error.message);
    }
  };

  const Edit = async (item) => {
    setName(item.name);
    setId(item._id);
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${urlServer}/category/update/${id}`,
        { name },
        {
          withCredentials: true,
        }
      );
      const newCategory = categories.map((item) =>
        item._id == id ? res.data.message : item
      );
      setCategories(newCategory);
      setName('');

      setId();
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="section max-w-4xl w-full mx-auto p-3 ">
      <h2 className="text-center font-semibold text-2xl mb-10">
        Add New Category
      </h2>
      <div className=" flex flex-wrap   gap-6">
        <form
          onSubmit={id == undefined ? handleSubmit : handleEdit}
          className="flex sm:max-w-[40%] w-full  self-start"
        >
          <input
            type="text"
            id="name"
            className="p-3 w-full focus:outline-none border border-gray-500 border-r-0"
            placeholder="Enter category name."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          {id == undefined ? (
            <button className="py-2 px-8 w-fit text-white bg-gray-600 rounded-md rounded-l-none">
              Add
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="py-2 px-6 w-fit text-white bg-gray-600 rounded-md rounded-l-none"
            >
              Update
            </button>
          )}
        </form>
        <div className="sm:max-w-[55%] w-full  flex flex-col  p-2 justify-between gap-4  bg-slate-200 rounded-md shadow-md">
          {categories.length > 0 ? (
            categories?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-2 bg-white "
              >
                <p className=" text-gray-700 font-semibold text-lg">
                  {item.name}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => Edit(item)}
                    className="py-2 px-6 w-fit text-white bg-indigo-500 rounded-md "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(item._id)}
                    className="py-2 px-6 w-fit text-white bg-red-500 rounded-md "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="font-semibold text-xl text-red-500 text-center">
              There is not category
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
