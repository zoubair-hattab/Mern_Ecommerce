import { urlServer } from '../../urlServer';
import { addToCard } from '../reducers/cardReducer';
import {
  loadUserFailure,
  loadUserStart,
  loadUserSuccess,
} from '../reducers/userReducer';
import axios from 'axios';
export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserStart());
    const res = await axios.get(`${urlServer}/user/user-info`, {
      withCredentials: true,
    });
    dispatch(loadUserSuccess(res?.data?.message));
    dispatch(addToCard(res?.data?.message.cart));
  } catch (error) {
    dispatch(loadUserFailure(error.message));
  }
};
