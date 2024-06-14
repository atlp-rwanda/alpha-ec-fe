import { configureStore, combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/RegisterSlice';
import loginReducer from './slices/loginSlice';
import otpReducer from './slices/otpSlice';
import categoriesReducer from './slices/categoriesSlice';
import productReducer from './slices/productSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  register: registrationReducer,
  login: loginReducer,
  otp: otpReducer,
  products: productReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
