import { createAction } from '@reduxjs/toolkit';
import { UserInterface } from '../slices/RegisterSlice';

export const registerUser = createAction<UserInterface>(
  'authentication/registerUser'
);
