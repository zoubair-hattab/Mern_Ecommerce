import React from 'react';
import { useSelector } from 'react-redux';
import SingleProduct from '../components/SingleProduct.jsx';
const HomePage = () => {
  const { products } = useSelector((state) => state.product);
  return (
    <div className="section container gap-6 grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products?.products?.map((product) => (
        <SingleProduct key={product._id} product={product} />
      ))}
    </div>
  );
};

export default HomePage;
