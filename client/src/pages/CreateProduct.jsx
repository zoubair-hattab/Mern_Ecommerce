import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { urlServer } from '../urlServer';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadProduct } from '../redux/actions/productAction';
const CreateProduct = () => {
  const { products } = useSelector((state) => state.product);
  const initialState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: '',
  };
  const fileInput = useRef();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [productForm, setProductFrom] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await axios.get(`/api/category/getcategories`);
        setCategory(res?.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategory();
  }, []);

  useEffect(() => {
    if (id) {
      setOnEdit(true);
      products?.forEach((product) => {
        if (product._id === id) {
          setProductFrom(product);
        }
      });
    } else {
      setOnEdit(false);
      setProductFrom(initialState);
    }
  }, [id]);

  const handleChangeInput = (e) => {
    setProductFrom({ ...productForm, [e.target.id]: e.target.value });
  };
  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      console.log(file);
      if (!file) {
        console.log('file doenot exist.');
        return;
      }

      if (file.size > 1024 * 1024) {
        // 1mb
        console.log('Size too large!');
        return;
      }

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        // 1mb
        console.log('File format is incorrect.');
        return;
      }
      let formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      const res = await axios.post(
        `/api/upload/upload-image`,
        formData,

        {
          withCredentials: true,
        }
      );
      setLoading(false);

      setProductFrom({ ...productForm, images: res.data.message });
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDestroy = async () => {
    try {
      setLoading(true);
      console.log(productForm?.images.public_id);
      const res = await axios.delete(
        `/api/upload/delete-image/${productForm?.images.public_id}`,
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log(res.data.message);
      setProductFrom({ ...productForm, images: null });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        if (productForm?.images) {
          const res = await axios.put(
            `/api/product/update/${productForm._id}`,
            productForm,
            {
              withCredentials: true,
            }
          );
          await dispatch(loadProduct());
          navigate('/');
        } else {
          console.log('please Upload an image first');
          return;
        }
      } else {
        if (productForm?.images) {
          const res = await axios.post(
            `/api/product/create-product`,
            productForm,
            {
              withCredentials: true,
            }
          );
        } else {
          console.log('please Upload an image first');
          return;
        }
        await dispatch(loadProduct());
        navigate('/');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" section container  ">
      <h2 className="text-2xl mb-7 font-semibold text-center">
        {onEdit ? 'Update' : 'Create'} Product
      </h2>
      <div className="sm:max-w-[576px] md:max-w-[768px] lg:max-w-[992px] mx-auto flex justify-between  items-center gap-6 flex-wrap">
        <div className=" relative max-w-[200px] h-[270px] sm:max-w-[150px] md:max-w-[170px] lg:max-w-[220px]    w-full  mx-auto sm:mx-0 ">
          <input
            type="file"
            accept="images/*"
            id="file"
            ref={fileInput}
            className="hidden"
            onChange={handleUpload}
          />
          {productForm?.images && (
            <span
              className="absolute to-5 right-5 text-red-500 z-50 text-2xl font-semibold cursor-pointer"
              onClick={handleDestroy}
            >
              &times;
            </span>
          )}

          {loading ? (
            <div
              role="status"
              className="w-full h-full flex  items-center justify-center"
            >
              <svg
                aria-hidden="true"
                className="inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
          ) : (
            <img
              onClick={() => fileInput.current.click()}
              src={`${
                productForm?.images
                  ? productForm?.images.url
                  : 'https://imgv3.fotor.com/images/homepage-feature-card/upload-image_2023-04-11-023334_kxuh.jpg'
              }`}
              alt=""
              className=" w-full h-full object-cover "
            />
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 sm:max-w-[360px] md:max-w-[500px] lg:max-w-[700px] "
        >
          <input
            type="text"
            id="product_id"
            className="block w-full p-2 text-gray-900 border
           border-gray-300 rounded-lg bg-gray-50 text-base
            focus:ring-blue-500 focus:border-blue-500  
             "
            placeholder="Product ID"
            onChange={handleChangeInput}
            value={productForm?.product_id}
          />
          <input
            type="text"
            id="title"
            className="block w-full p-2 text-gray-900 border
           border-gray-300 rounded-lg bg-gray-50 text-base
            focus:ring-blue-500 focus:border-blue-500  
             "
            placeholder="Enter a title for your product"
            onChange={handleChangeInput}
            value={productForm?.title}
          />
          <input
            type="number"
            id="price"
            className="block w-full p-2 text-gray-900 border
           border-gray-300 rounded-lg bg-gray-50 text-base
            focus:ring-blue-500 focus:border-blue-500  
             "
            placeholder="Enter a price for your product"
            onChange={handleChangeInput}
            value={productForm?.price}
          />
          <textarea
            id="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 resize-none bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
            onChange={handleChangeInput}
            value={productForm?.description}
          ></textarea>
          <input
            type="text"
            id="content"
            className="block w-full p-2 text-gray-900 border
           border-gray-300 rounded-lg bg-gray-50 text-base
            focus:ring-blue-500 focus:border-blue-500  
             "
            placeholder="Enter a content for your product"
            onChange={handleChangeInput}
            value={productForm?.content}
          />
          <select
            id="category"
            onChange={handleChangeInput}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={productForm?.category}
          >
            <option defaultValue>Choose a Category</option>
            {category?.map((item) => (
              <option key={item._id} value={item.name} className="h-2">
                {item.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-slate-700 text-white rounded-lg py-2 px-4  hover:opacity-95 disabled:opacity-80"
            disabled={loading}
          >
            {onEdit ? 'Edit Product' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
