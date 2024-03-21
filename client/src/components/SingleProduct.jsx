import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCards, removeFromCards } from '../redux/actions/cardAction';
import { removeFromCard } from '../redux/reducers/cardReducer';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product, deleteProduct }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="w-full mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow overflow-hidden ">
      <img
        src={product?.images.url}
        alt=""
        className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
      />
      <div className="p-3 flex flex-col gap-2 w-full">
        <h2 className="truncate text-lg font-semibold text-slate-700">
          <Link to={`${product._id}`} className="">
            {product.title}
          </Link>
        </h2>
        <h3 className=" text-slate-500 mt-2 font-semibold ">
          ${product.price}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          {currentUser?.isAdmin ? (
            <>
              <button
                onClick={() =>
                  deleteProduct(product?._id, product.images.public_id)
                }
                className="bg-slate-700 text-white rounded-lg py-2 px-4  hover:opacity-95 disabled:opacity-80"
              >
                Delete
              </button>
              <Link
                to={`edit_product/${product._id}`}
                className="bg-teal-700 text-white rounded-lg py-2 px-4  hover:opacity-95 disabled:opacity-80"
              >
                Edit
              </Link>
            </>
          ) : (
            <>
              <button
                className="py-2 px-8 rounded-md text-white  bg-gradient-to-r from-green-400 to-blue-500  shadow-md"
                onClick={() => dispatch(addToCards(product, currentUser))}
              >
                Buy
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
