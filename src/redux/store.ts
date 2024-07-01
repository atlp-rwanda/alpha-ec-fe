import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import fetchReducer from './slices/fetchSlice';
import otpReducer from './slices/otpSlice';
import resetpasswordReducer from './slices/ResetpasswordSlice';
import forgotPasswordReducer from './slices/ForgotpasswordSlice';
import productReducer from './slices/ProductSlice';
import categoriesReducer from './slices/categorySlice';
import sellerReducer from './slices/sellerSlice';
import usersReducer from './slices/disableaccount';
import profileReducer from './slices/profileSlice';
import itemReducer from './slices/itemSlice';
import updatePasswordReducer from './slices/updatePasswordSlice';
import assignRoleReducer from './slices/assignroleSlice';
import chatsReducer from './slices/chatSlice';

export const rootReducer = combineReducers({
  otp: otpReducer,
  products: productReducer,
  categories: categoriesReducer,
  Resetpassword: resetpasswordReducer,
  forgotPassword: forgotPasswordReducer,
  sellers: sellerReducer,
  fetch: fetchReducer,
  user: userReducer,
  assignRole: assignRoleReducer,
  registereUsers: usersReducer,
  profile: profileReducer,
  product: itemReducer,
  updatePassword: updatePasswordReducer,
  users: userReducer,
  chat: chatsReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
