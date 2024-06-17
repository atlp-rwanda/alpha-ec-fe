import { configureStore, combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/RegisterSlice';
import loginReducer from './slices/loginSlice';
import otpReducer from './slices/otpSlice';
import resetpasswordReducer from './slices/ResetpasswordSlice';
import forgotPasswordReducer from './slices/ForgotpasswordSlice';

export const rootReducer = combineReducers({
  otp: otpReducer,
  register: registrationReducer,
  login: loginReducer,
  Resetpassword: resetpasswordReducer,
  forgotPassword: forgotPasswordReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
