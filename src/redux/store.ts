import { configureStore, combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/RegisterSlice';
import loginReducer from './slices/loginSlice';
import otpReducer from './slices/otpSlice';

export const rootReducer = combineReducers({
  register: registrationReducer,
  login: loginReducer,
  otp: otpReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
