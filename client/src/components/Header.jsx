import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { urlServer } from '../urlServer';
import { IoCartSharp } from 'react-icons/io5';
import { IoIosMenu } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
const Header = () => {
  const [menu, setMenu] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const { card } = useSelector((state) => state.card);
  const logout = async () => {
    try {
      const res = await axios.post(
        `${urlServer}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      window.location.href = '/';
      localStorage.removeItem('persist:root');
    } catch (error) {
      console.log(error);
    }
  };
  const adminRouter = () => {
    return (
      <>
        <li
          className="hover:bg-slate-500 md:hover:bg-transparent transition-all duration-300"
          onClick={() => setMenu(false)}
        >
          <Link
            to="/create_product"
            className="py-2 block md:py-0 px-3 md:px-0"
          >
            Create Product
          </Link>
        </li>
        <li
          className="hover:bg-slate-500 md:hover:bg-transparent transition-all duration-300"
          onClick={() => setMenu(false)}
        >
          <Link to="/category" className="py-2 block md:py-0 px-3 md:px-0">
            Category
          </Link>
        </li>
      </>
    );
  };
  const loggedRouter = () => {
    return (
      <>
        <li
          className="hover:bg-slate-500 md:hover:bg-transparent transition-all duration-300"
          onClick={() => setMenu(false)}
        >
          <Link to="/history" className="py-2 block md:py-0 px-3 md:px-0">
            History
          </Link>
        </li>
        <li
          className="hover:bg-slate-500 md:hover:bg-transparent transition-all duration-300"
          onClick={() => setMenu(false)}
          onClick={logout}
        >
          <Link className="py-2 block md:py-0 px-3 md:px-0">Logout</Link>
        </li>
      </>
    );
  };
  return (
    <header className="bg-slate-400 fixed top-0 w-full shadow-md z-30">
      <div className="container py-5 flex items-center justify-between gap-5">
        <h1 className="text-xl font-semibold text-gray-600">
          <Link to="/">
            Zoubair
            <span className="text-2xl text-blue-800 font-bold">Shop</span>
          </Link>
        </h1>
        <ul
          className={`fixed z-50 bg-gray-100 h-screen top-0 left-[-330px] py-3 max-w-[320px] w-full  md:bg-transparent md:h-fit md:static md:max-w-fit md:p-0 md:flex md:gap-2 items-center ml-auto ${
            menu && 'translate-x-[330px]'
          } transition-all duration-300`}
        >
          <h1 className="text-xl px-3 flex items-center justify-between font-semibold text-gray-600 py-3.5 mb-3 border-b-2 border-b-slate-200 md:hidden">
            <Link to="/">
              Zoubair
              <span className="text-2xl text-blue-800 font-bold">Shop</span>
            </Link>
            <IoClose size={30} onClick={() => setMenu(false)} />
          </h1>

          {currentUser && currentUser?.isAdmin && adminRouter()}
          {currentUser ? (
            loggedRouter()
          ) : (
            <li
              className="hover:bg-slate-500 md:hover:bg-transparent transition-all duration-300"
              onClick={() => setMenu(false)}
            >
              <Link to="/login" className="py-2 block md:py-0 px-3 md:px-0">
                Sign In
              </Link>
            </li>
          )}
        </ul>
        <div className="flex items-center gap-3">
          {!currentUser?.isAdmin && (
            <Link to="/cart" className="relative ">
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-base text-center leading-5 rounded-full">
                {card?.length}
              </span>
              <IoCartSharp size={33} className="text-gray-800 " />
            </Link>
          )}

          <IoIosMenu
            size={33}
            className="text-gray-800 md:hidden"
            onClick={() => setMenu(true)}
          />
        </div>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black opacity-25 md:hidden ${
          menu ? 'flex' : 'hidden'
        }`}
      ></div>
    </header>
  );
};

export default Header;
