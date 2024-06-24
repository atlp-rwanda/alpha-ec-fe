import { configureStore, combineReducers } from '@reduxjs/toolkit';
import otpReducer from './slices/otpSlice';
import resetpasswordReducer from './slices/ResetpasswordSlice';
import forgotPasswordReducer from './slices/ForgotpasswordSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/ProductSlice';
import categoriesReducer from './slices/categorySlice';
import sellerReducer from './slices/sellerSlice';
import usersReducer from './slices/disableaccount';
import profileReducer from './slices/profileSlice';
import itemReducer from './slices/itemSlice';
import updatePasswordReducer from './slices/updatePasswordSlice';

export const rootReducer = combineReducers({
  otp: otpReducer,
  categories: categoriesReducer,
  user: userReducer,
  products: productReducer,
  Resetpassword: resetpasswordReducer,
  forgotPassword: forgotPasswordReducer,
  sellers: sellerReducer,
  registereUsers: usersReducer,
  profile: profileReducer,
  product: itemReducer,
  updatePassword: updatePasswordReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
