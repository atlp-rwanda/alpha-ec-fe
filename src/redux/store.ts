import { configureStore, combineReducers } from '@reduxjs/toolkit';
import otpReducer from './slices/otpSlice';
import resetpasswordReducer from './slices/ResetpasswordSlice';
import forgotPasswordReducer from './slices/ForgotpasswordSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/ProductSlice';

export const rootReducer = combineReducers({
  otp: otpReducer,
  user: userReducer,
  products: productReducer,
  Resetpassword: resetpasswordReducer,
  forgotPassword: forgotPasswordReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
