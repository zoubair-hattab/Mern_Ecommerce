import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateRegister } from '../utlis/validateInputs';
import { urlServer } from '../urlServer';
const RegisterPage = () => {
  const [userForm, setUserForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const handChnageInput = (e) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    let res;
    try {
      const valid = validateRegister(userForm);
      if (valid.errLength > 0) {
        setResult(valid.errMsg);

        return;
      }
      setLoading(true);
      await axios.post(`${urlServer}/auth/create-user`, userForm);
      navigate('/login');

      setLoading(false);
    } catch (error) {
      setResult(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <div className="section px-3">
      <div className="max-w-xl w-full shadow-sm mx-auto p-7 border  ">
        <h2 className="text-center text-4xl text-gray-700 font-semibold mb-8">
          Register Page
        </h2>
        <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              id="name"
              defaultValue={userForm?.name}
              placeholder="Enter your name"
              className="p-3 focus:outline-none text-base text-gray-600 focus:border-blue-500 focus:border-2  border border-gray-400 rounded-md"
              onChange={handChnageInput}
            />
            {result && result?.name && (
              <p className="text-sm text-red-500">{result.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="email"
              id="email"
              defaultValue={userForm?.email}
              placeholder="Enter Your Email"
              className="p-3 text-base text-gray-600 focus:outline-none focus:border-blue-500 focus:border-2  border border-gray-400 rounded-md"
              onChange={handChnageInput}
            />
            {result && result?.email && (
              <p className="text-sm text-red-500">{result.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              id="password"
              defaultValue={userForm?.pasword}
              placeholder="Enter your password"
              className="p-3  text-base text-gray-600 focus:outline-none focus:border-blue-500 focus:border-2  border border-gray-400 rounded-md"
              onChange={handChnageInput}
            />
            {result && result?.password && (
              <p className="text-sm text-red-500">{result.password}</p>
            )}
          </div>
          <button
            disabled={loading}
            className="p-3 w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold text-xl hover:bg-gradient-to-r hover:from-sky-600 hover:to-indigo-700 rounded-md transition-all duration-300 "
          >
            {loading ? 'Loading...' : ' Register'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-3">
          If you already have an account, please
          <Link
            to="/login"
            className="text-blue-500 hover:underline text-sm ml-1"
          >
            Login
          </Link>
        </p>
        {result && !(result?.name || result?.email || result?.password) && (
          <p className="text-base text-center text-red-500 mt-3">{result}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
