import { configureStore, combineReducers } from '@reduxjs/toolkit';
import registrationReducer from './slices/RegisterSlice';
import loginReducer from './slices/loginSlice';
import otpReducer from './slices/otpSlice';
import usersReducer from './slices/disableaccount';

export const rootReducer = combineReducers({
  register: registrationReducer,
  login: loginReducer,
  otp: otpReducer,
  users: usersReducer
});

export const store = configureStore({
  reducer: rootReducer
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
