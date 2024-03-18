import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  card: [],
};
const cardReducer = createSlice({
  name: 'cardReducer',
  initialState,
  reducers: {
    addToCard: (state, action) => {
      state.card = action.payload;
    },
    removeFromCard: (state, action) => {
      state.card = action.payload;
    },
  },
});
export const { addToCard, removeFromCard } = cardReducer.actions;
export default cardReducer.reducer;
