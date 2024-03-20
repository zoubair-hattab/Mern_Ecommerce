import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from '../components/SingleProduct.jsx';
import { urlServer } from '../urlServer.js';
import axios from 'axios';
import { loadProduct } from '../redux/actions/productAction.js';
import Filter from '../components/Filter.jsx';
const HomePage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const [product, setProduct] = useState(products?.products);
  const deleteProduct = async (id, public_id) => {
    try {
      const destroyImg = await axios.delete(
        `${urlServer}/upload/delete-image/${public_id}`,

        { withCredentials: true }
      );
      const deleteProduct = await axios.delete(
        `${urlServer}/product/delete/${id}`,
        { withCredentials: true }
      );
      const filters = products.products.filter((item) => {
        return item._id !== id;
      });
      setProduct(filters);
      await await dispatch(loadProduct());
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="section container">
      <Filter />
      <div className=" gap-6 grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
        {product?.map((product) => (
          <SingleProduct
            key={product._id}
            product={product}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
