import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, FormErrorInterface } from '@/utils';
import _ from 'lodash';
import { jwtDecode } from 'jwt-decode';

export interface UserRegistrationInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  createdAt: string;
}

export interface LogInInterface {
  email: string;
  password: string;
}

export enum USER_ROLE {
  SELLER = 'seller',
  ADMIN = 'admin',
  BUYER = 'buyer'
}

export interface UserInfoInterface {
  name?: string;
  role?: USER_ROLE;
  email?: string;
  photoUrl?: string;
  preferedlanguage?: string | null;
  preferedcurrency?: string | null;
  phone?: string;
  address?: string;
}

interface UserState {
  userInfo: UserInfoInterface | null;
  role: USER_ROLE | null;
  loading: boolean;
  error: FormErrorInterface | null;
  success: boolean;
}

const initialState: UserState = {
  userInfo: null,
  role: null,
  loading: false,
  error: null,
  success: false
};

export interface DecodedInterface {
  id: string;
  role: USER_ROLE;
  iat: number;
  exp: number;
}

export interface VerifyOtpResponse {
  data: string;
}

export const registerUser = createAsyncThunk(
  'authentication/registerUser',
  async (userData: UserRegistrationInterface, { rejectWithValue }) => {
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

export const logInUser = createAsyncThunk(
  'authentication/loginUser',
  async (userData: LogInInterface, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('POST', `/users/login`, userData);
      localStorage.setItem('token', JSON.stringify(response.data.data));
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

export const getUserProfile = createAsyncThunk(
  'authentication/userProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('GET', `/users/profile`, '', true);
      return response.data.data;
    } catch (err: unknown) {
      localStorage.clear();
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'login failed');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

export const verifyOtp = createAsyncThunk(
  'authentication/verifyOtp',
  async (
    { otp, token }: { otp: string; token: string | '' },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosRequest('POST', `/users/verify/${token}`, {
        otp
      });

      return response.data as unknown as VerifyOtpResponse;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'Verification failed');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserRole(state, action) {
      state.role = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.role = null;
        state.userInfo = {};
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false;
        state.role = null;
        state.error = null;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.role = null;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
      })
      .addCase(logInUser.pending, state => {
        state.loading = true;
        state.role = null;
        state.userInfo = {};
        state.error = null;
        state.success = false;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.role = (jwtDecode(action.payload.data) as DecodedInterface).role;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
        state.role = null;
      })
      .addCase(getUserProfile.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userInfo = _.pick(action.payload, [
          'name',
          'email',
          'photoUrl',
          'preferedlanguage',
          'preferedcurrency',
          'phone',
          'address'
        ]);
        state.success = true;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
        state.role = null;
      });
  }
});

export default UserSlice.reducer;
export const { updateUserRole } = UserSlice.actions;
