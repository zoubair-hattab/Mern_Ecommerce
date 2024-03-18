import { urlServer } from '../../urlServer';
import { addToCard } from '../reducers/cardReducer';
import axios from 'axios';
export const addToCards = (item, currentUser) => async (dispatch, getState) => {
  try {
    if (!currentUser) {
      console.log('you are not login');
      return;
    }

    const check = getState()?.card?.card.every((el) => {
      if (item._id !== undefined) return el._id !== item._id;
    });
    if (check) {
      const cart = [...getState()?.card?.card, { ...item, quantity: 1 }];

      dispatch(
        addToCard([...getState()?.card?.card, { ...item, quantity: 1 }])
      );
      await axios.patch(
        `${urlServer}/user/add-to-cart`,
        {
          cart,
        },
        {
          withCredentials: true,
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeFromCards =
  (item, currentUser) => async (dispatch, getState) => {
    try {
      if (!currentUser) {
        console.log('you are not login');
        return;
      }

      const check = getState()?.card?.card.filter((el) => {
        return el._id !== item._id;
      });

      dispatch(addToCard(check));
      await axios.patch(
        `${urlServer}/user/add-to-cart`,
        {
          cart: check,
        },
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
