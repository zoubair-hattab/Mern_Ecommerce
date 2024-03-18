import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  currentUser: null,
  error: null,
  errorlogin: null,
  loading: false,
};
const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.errorlogin = null;
    },
    signInFailure: (state, action) => {
      state.errorlogin = action.payload;
      state.loading = false;
    },
    loadUserStart: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loadUserFailure: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;

      state.loading = false;
    },
    clearErrors: (state) => {
      state.error = null;
      state.errorlogin = null;
    },
  },
});
export const {
  loadUserStart,
  loadUserSuccess,
  loadUserFailure,
  signInStart,
  signInSuccess,
  signInFailure,
  clearErrors,
} = userReducer.actions;
export default userReducer.reducer;
