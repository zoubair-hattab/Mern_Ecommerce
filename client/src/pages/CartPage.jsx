import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { addToCards, removeFromCards } from '../redux/actions/cardAction';
import axios from 'axios';
import { urlServer } from '../urlServer';
import { addToCard, removeFromCard } from '../redux/reducers/cardReducer';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PaymentBtn from '../components/PaymentBtn';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
  const { card } = useSelector((state) => state.card);
  const { currentUser } = useSelector((state) => state.user);
  const [totale, setTotale] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const totalPrice = card?.reduce((prev, item) => {
      return prev + item.price * item.quantity;
    }, 0);
    setTotale(totalPrice);
  }, [card]);
  const increment = async (id) => {
    let newObject = [];

    card.forEach((item) => {
      const value = { ...item };
      newObject.push({ ...item });
    });
    newObject.forEach((item) => {
      if (item._id == id) {
        item.quantity += 1;
      }
    });
    addTocardd(newObject);
    dispatch(addToCard(newObject));
  };
  const decrement = async (id) => {
    let newObject = [];

    card.forEach((item) => {
      const value = { ...item };
      newObject.push({ ...item });
    });
    newObject.forEach((item) => {
      if (item._id == id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    addTocardd(newObject);
    dispatch(removeFromCard(newObject));
  };
  const addTocardd = async (cart) => {
    await axios.patch(
      `/api/user/add-to-cart`,
      {
        cart: cart,
      },
      {
        withCredentials: true,
      }
    );
  };

  const transSuccess = async (payment) => {
    const { id, payer } = payment;
    console.log(payer?.address.country_code, id);
    await axios.post(
      `/api/payment`,
      {
        cart: card,
        paymentID: id,
        address: payer?.address.country_code,
      },
      {
        withCredentials: true,
      }
    );
    addTocardd([]);
    dispatch(addToCard([]));
    navigate('/history');
  };
  return (
    <div className="section container flex flex-col gap-4 max-w-3xl mx-auto">
      {card?.length > 0 ? (
        <>
          {card.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 p-3 flex  justify-between shadow-md"
            >
              <div className="flex items-center gap-4 justify-between flex-1 flex-wrap">
                <img
                  src={item.images.url}
                  alt=""
                  className="w-full  sm:w-32 sm:h-32 object-cover"
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
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <h3 className="text-indigo-500 text-lg font-semibold">
                Total prix:
              </h3>
              <span>${totale}</span>
            </div>
            <PaymentBtn
              product={{ dicription: 'frfrf', price: totale }}
              transSuccess={transSuccess}
            />
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
