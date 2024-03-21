import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SingleProduct from '../components/SingleProduct';
import { addToCards } from '../redux/actions/cardAction';
import Loading from '../components/loader/Loading';
const DetailsPage = () => {
  const { id } = useParams();
  const { products, loading } = useSelector((state) => state.product);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [relatedproduct, setRelatedProduct] = useState([]);
  console.log(products);
  useEffect(() => {
    const loadProduct = () => {
      const items = products?.find((item) => item._id == id);
      setProduct(items);
      const relatedProduct = products?.filter(
        (item) => item.category == items.category
      );
      setRelatedProduct(relatedProduct);
    };
    loadProduct();
  }, [id, products]);

  return (
    <div className="container section">
      {loading ? (
        <Loading />
      ) : (
        <div className=" flex flex-col gap-7">
          <div className=" max-w-5xl  shadow-sm w-full mx-auto flex justify-between gap-6 flex-wrap px-7">
            <img
              src={product?.images?.url}
              alt=""
              className="w-full h-[320px] sm:w-[225px] object-fill md:w-[385px] md:h-[400px]md:object-cover"
            />
            <div className="flex-1 flex flex-col gap-4">
              <h2 className="font-semibold">{product?.title}</h2>
              <h3 className="font-semibold text-xl text-indigo-500">
                ${product?.price}
              </h3>
              <p className="text-base text-gray-600 leading-7">
                {product?.description}
              </p>
              <h3 className="font-semibold text-xl text-indigo-500">
                Sold <span className="text-gray-700">{product?.sold}</span>
              </h3>
              <button
                onClick={() => dispatch(addToCards(product, currentUser))}
                className="py-3 px-6 font-semibold bg-gray-800 uppercase text-white rounded-sm w-fit"
              >
                Buy now
              </button>
            </div>
          </div>
          <div className="p-4 bg-white shadow-sm">
            <h2 className="font-semibold text-xl ">Related Product</h2>
            <div className=" gap-6 grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedproduct?.map((product) => (
                <SingleProduct key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
