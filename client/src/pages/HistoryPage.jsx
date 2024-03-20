import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { urlServer } from '../urlServer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const HistoryPage = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const loadHistroy = async () => {
      try {
        if (currentUser.isAdmin) {
          const res = await axios.get(`${urlServer}/payment`, {
            withCredentials: true,
          });
          setData(res?.data.message);
        } else {
          const res = await axios.get(`${urlServer}/user/history`, {
            withCredentials: true,
          });
          setData(res?.data.message);
        }
      } catch (error) {}
    };
    loadHistroy();
  }, [currentUser]);
  console.log(data);
  return (
    <div className="section max-w-2xl w-full mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Payment ID
              </th>
              <th scope="col" className="px-6 py-3">
                Data of Purchased
              </th>

              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">{item.paymentID}</td>
                <td className="px-6 py-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <Link
                    to={`/history/${item._id}`}
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
