import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urlServer } from '../urlServer';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HistoryDetails = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { id } = useParams();
  useEffect(() => {
    const loadHistroy = async () => {
      try {
        if (currentUser.isAdmin) {
          const res = await axios.get(`/api/payment`, {
            withCredentials: true,
          });
          const filterd = res?.data.message.find((item) => item._id === id);
          setData(filterd);
        } else {
          const res = await axios.get(`/api/user/history`, {
            withCredentials: true,
          });
          const filterd = res?.data.message.find((item) => item._id === id);
          setData(filterd);
        }
      } catch (error) {}
    };
    loadHistroy();
  }, [currentUser, id]);

  return (
    <div className="section max-w-2xl w-full mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Post Code
              </th>
              <th scope="col" className="px-6 py-3">
                Country Code
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <td className="px-6 py-4">{data?.name}</td>
              <td className="px-6 py-4">{data?.email}</td>

              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">{data?.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="relative mt-5 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Products
              </th>
              <th scope="col" className="px-6 py-3">
                Quntity
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.cart?.map((item) => (
              <tr
                key={item._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  <img
                    src={item.images.url}
                    alt=""
                    className="w-32 h-32 object-cover"
                  />
                </td>
                <td className="px-6 py-4">{item.title}</td>

                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryDetails;
