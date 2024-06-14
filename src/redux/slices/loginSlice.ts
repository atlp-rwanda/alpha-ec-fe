import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, FormErrorInterface } from '@/utils';

export interface LogInInterface {
  email: string;
  password: string;
}

export interface response {
  status: 'success' | 'error';
  message: string;
  data: string;
}
interface logInState {
  loading: boolean;
  error: FormErrorInterface | null;
  success: boolean;
  data: response | null;
}

const initialState: logInState = {
  loading: false,
  error: null,
  success: false,
  data: null
};

export const logInUser = createAsyncThunk(
  'authentication/loginUser',
  async (userData: LogInInterface, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('POST', `/users/login`, userData);
      const token = response.data as unknown as response;
      localStorage.setItem('token', JSON.stringify(token.data));
      return response.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'login failed');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

const logInSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(logInUser.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.data = action.payload as unknown as response;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
      });
  }
});

export default logInSlice.reducer;
