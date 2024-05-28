import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, FormErrorInterface } from '@/utils';

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

interface RegistrationState {
  loading: boolean;
  error: FormErrorInterface | null;
  success: boolean;
}

const initialState: RegistrationState = {
  loading: false,
  error: null,
  success: false
};

export const registerUser = createAsyncThunk(
  'authentication/registerUser',
  async (userData: UserInterface, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('POST', `/users/register`, userData);
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'Registration failed');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

const registrationSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
      });
  }
});

export default registrationSlice.reducer;
