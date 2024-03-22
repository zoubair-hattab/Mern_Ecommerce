import { urlServer } from '../../urlServer';
import {
  productFail,
  productStart,
  productSuccess,
} from '../reducers/productRducer';
import axios from 'axios';
export const loadProduct =
  (page = 1, category = '', sort = '', search = '') =>
  async (disptach) => {
    try {
      disptach(productStart());

      const res = await axios.get(
        `/api/product/getProducts?limit=${
          page * 8
        }&${category}&${sort}&title[regex]=${search}`
      );
      disptach(productSuccess(res?.data?.message.products));
    } catch (error) {
      disptach(productFail(error?.response?.data?.message));
    }
  };
