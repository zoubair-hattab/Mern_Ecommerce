import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCards, removeFromCards } from '../redux/actions/cardAction';
import { removeFromCard } from '../redux/reducers/cardReducer';
import { Link } from 'react-router-dom';

const SingleProduct = ({ product, deleteProduct }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className=" w-full max-w-[330px] mx-auto shadow-md bg-slate-100 rounded-md overflow-hidden">
      <img
        src={product?.images.url}
        alt=""
        className="w-full h-[220px] object-cover hover:scale-105 transition-all duration-300 "
      />
      <div className="py-5 px-3 flex flex-col gap-3">
        <h2 className="font-semibold text-base line-clamp-1">
          {product.title}
        </h2>
        <h3 className=" text-xl font-semibold  text-indigo-500">
          ${product.price}
        </h3>
        <p className="line-clamp-2 text-sm leading-6 text-gray-500">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          {currentUser?.isAdmin ? (
            <>
              <button
                onClick={() =>
                  deleteProduct(product?._id, product.images.public_id)
                }
                className="py-2 px-8 rounded-md text-white  bg-gradient-to-r from-green-400 to-blue-500  shadow-md"
              >
                Delete
              </button>
              <Link
                to={`edit_product/${product._id}`}
                className="py-2 px-8 rounded-md text-white  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md"
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
              <Link
                to={`/${product._id}`}
                className="py-2 px-8 rounded-md text-white  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md"
              >
                View
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
