import { urlServer } from '../../urlServer';
import {
  productFail,
  productStart,
  productSuccess,
} from '../reducers/productRducer';
import axios from 'axios';
export const loadProduct = () => async (disptach) => {
  try {
    disptach(productStart());
    const res = await axios.get(`${urlServer}/product/getProducts`);
    console.log(res.data);
    disptach(productSuccess(res?.data?.message));
  } catch (error) {
    disptach(productFail(error?.response?.data?.message));
  }
};
