import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { addToCards, removeFromCards } from '../redux/actions/cardAction';
import axios from 'axios';
import { urlServer } from '../urlServer';
import { addToCard, removeFromCard } from '../redux/reducers/cardReducer';
const CartPage = () => {
  const { card } = useSelector((state) => state.card);
  const { currentUser } = useSelector((state) => state.user);
  const [totale, setTotale] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const totalPrice = card?.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
    setTotale(totalPrice);
  }, [card]);
  const increment = async (id) => {
    let mk = [];

    card.forEach((item) => {
      const value = { ...item };
      mk.push({ ...item });
    });
    mk.forEach((item) => {
      if (item._id == id) {
        //console.log(value.quantity);
        item.quantity += 1;
      }
    });
    console.log(mk);
    addTocardd(mk);
    dispatch(addToCard(mk));
  };
  const decrement = async (id) => {
    let mk = [];

    card.forEach((item) => {
      const value = { ...item };
      mk.push({ ...item });
    });
    mk.forEach((item) => {
      if (item._id == id) {
        //console.log(value.quantity);
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    console.log(mk);
    addTocardd(mk);
    dispatch(removeFromCard(mk));
  };
  const addTocardd = async (cart) => {
    await axios.patch(
      `${urlServer}/user/add-to-cart`,
      {
        cart,
      },
      {
        withCredentials: true,
      }
    );
  };
  return (
    <div className="section container flex flex-col gap-4 max-w-3xl mx-auto">
      {card?.length > 0 ? (
        <>
          {card.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 p-3 flex justify-between shadow-md"
            >
              <div className="flex items-center gap-4 justify-between flex-1">
                <img
                  src={item.images.url}
                  alt=""
                  className="w-32 h-32 object-cover"
                />
                <div className="flex flex-col gap-4 flex-1">
                  <h2 className=" text-gray-600 font-semibold text-sm line-clamp-1 md:text-lg md:line-clamp-none">
                    {item.title}
                  </h2>
                  <div className="flex items-center ">
                    <span className="text-indigo-500 font-semibold text-lg">
                      Quantity:
                    </span>
                    <span
                      onClick={() => increment(item._id)}
                      className="ml-3 text-xl font-semibold text-teal-500 flex items-center justify-center w-9 h-9 bg-slate-300 rounded-l-md shadow-sm"
                    >
                      +
                    </span>
                    <span className="w-9 h-9 bg-slate-200 text-xl flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <span
                      onClick={() => decrement(item._id)}
                      className="text-xl font-semibold text-red-500 flex items-center justify-center w-9 h-9 bg-slate-300 rounded-r-md shadow-sm"
                    >
                      -
                    </span>
                  </div>
                  <h2 className="text-base  font-semibold text-teal-500">
                    <span className="text-indigo-500 text-lg">Price:</span> $
                    {item.price * item.quantity}
                  </h2>
                </div>
              </div>
              <IoClose
                size={20}
                color="red"
                onClick={() => dispatch(removeFromCards(item, currentUser))}
              />
            </div>
          ))}
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-indigo-500 text-lg font-semibold">
                Total prix:
              </h3>
              <span>${totale}</span>
            </div>
          </div>
        </>
      ) : (
        <img
          src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png"
          className="object-cover "
        />
      )}
    </div>
  );
};

export default CartPage;
