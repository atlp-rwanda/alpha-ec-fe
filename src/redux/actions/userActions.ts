import { createAction } from '@reduxjs/toolkit';
import { UserInterface } from '../slices/RegisterSlice';

export const registerUser = createAction<UserInterface>(
  'authentication/registerUser'
);
export const loginUser = createAction<UserInterface>(
  'authentication/loginUser'
);
export const resetpassword = createAction<UserInterface>(
  'authentication/resetpassword'
);
