import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validateLogin } from '../utlis/validateInputs';
import { urlServer } from '../urlServer';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearErrors,
  signInFailure,
  signInStart,
  signInSuccess,
} from '../redux/reducers/userReducer';
import { addToCard } from '../redux/reducers/cardReducer';

const LoginPage = () => {
  const [userForm, setUserForm] = useState({});
  const [result, setResult] = useState(null);
  const { loading, errorlogin } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handChnageInput = (e) => {
    setUserForm({ ...userForm, [e.target.id]: e.target.value });
  };
  useEffect(() => {
    dispatch(clearErrors());
  }, []);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);

    try {
      dispatch(clearErrors());
      const valid = validateLogin(userForm);

      if (valid.errLength > 0) {
        setResult(valid.errMsg);

        return;
      }
      dispatch(signInStart());

      const res = await axios.post(`/api/auth/login`, userForm, {
        withCredentials: true,
      });
      dispatch(signInSuccess(res.data.message));
      dispatch(addToCard(res.data.message.cart));

      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error?.response?.data?.message));
    }
  };
  return (
    <div className="section px-3">
      <div className="max-w-xl w-full shadow-sm mx-auto p-7 border  ">
        <h2 className="text-center text-4xl text-gray-700 font-semibold mb-8">
          Login Page
        </h2>
        <form className="flex flex-col gap-5" onSubmit={HandleSubmit}>
          <div className="flex flex-col gap-2">
            <input
              type="text"
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
            {loading ? 'Loading...' : ' Login'}
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-3">
          If you do not already have an account, please
          <Link
            to="/register"
            className="text-blue-500 hover:underline text-sm ml-1"
          >
            Register.
          </Link>
        </p>
        {errorlogin && (
          <p className="text-base text-center text-red-500 mt-3">
            {errorlogin}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
