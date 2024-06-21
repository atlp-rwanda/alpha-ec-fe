import { configureStore, combineReducers } from '@reduxjs/toolkit';
import otpReducer from './slices/otpSlice';
import resetpasswordReducer from './slices/ResetpasswordSlice';
import forgotPasswordReducer from './slices/ForgotpasswordSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/ProductSlice';
import usersReducer from './slices/disableaccount';
import profileReducer from './slices/profileSlice';
import categoriesReducer from './slices/categoriesSlice';
import itemReducer from './slices/itemSlice';
import notificationsReducer from './slices/notification';

export const rootReducer = combineReducers({
  otp: otpReducer,
  categories: categoriesReducer,
  user: userReducer,
  products: productReducer,
  Resetpassword: resetpasswordReducer,
  forgotPassword: forgotPasswordReducer,
  registereUsers: usersReducer,
  profile: profileReducer,
  product: itemReducer,
  notifications: notificationsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
