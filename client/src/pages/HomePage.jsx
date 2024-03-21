import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from '../components/SingleProduct.jsx';
import { urlServer } from '../urlServer.js';
import axios from 'axios';
import { loadProduct } from '../redux/actions/productAction.js';
import Filter from '../components/Filter.jsx';
import Loading from '../components/loader/Loading.jsx';
const HomePage = ({ setOrder, setCategory, setSearch, page, setPage }) => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    setProduct(products);
  }, [products]);

  const deleteProduct = async (id, public_id) => {
    try {
      const deleteProduct = await axios.delete(
        `${urlServer}/product/delete/${id}`,
        { withCredentials: true }
      );
      const filters = product?.filter((item) => {
        return item._id !== id;
      });
      setProduct(filters);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="section container">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Filter
            setOrder={setOrder}
            setCategory={setCategory}
            setSearch={setSearch}
          />
          <div className=" gap-6 grid grid-cols-1   sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
            {product?.map((product) => (
              <SingleProduct
                key={product._id}
                product={product}
                deleteProduct={deleteProduct}
              />
            ))}
          </div>
          {product.length < page * 4 ? (
            ''
          ) : (
            <button
              type="button"
              onClick={() => setPage(page + 1)}
              className=" mt-5   text-white bg-gradient-to-br
           from-purple-600 to-blue-500 
           hover:bg-gradient-to-bl  
            rounded-lg text-sm px-5 py-2.5 text-center  block mx-auto"
            >
              Load more
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
