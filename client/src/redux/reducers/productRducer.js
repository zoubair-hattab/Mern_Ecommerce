import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  products: [],
  loading: true,
  error: null,
};
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    productStart: (state) => {
      state.loading = true;
    },
    productSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = null;
    },
    productFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { productStart, productSuccess, productFail } =
  productReducer.actions;
export default productReducer.reducer;
