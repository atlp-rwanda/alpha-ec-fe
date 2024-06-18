import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from '@/utils';

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  gender: string;
  birthdate: string;
  photoUrl: string;
  status: boolean;
}

export interface FetchedUsers {
  message: string;
  data: User[];
}

export interface UserState {
  users: FetchedUsers | null;
  loading: boolean;
  message: string;
  error: string | null;
  success: boolean;
}

const initialState: UserState = {
  users: null,
  loading: false,
  message: '',
  error: '',
  success: false
};

export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest('GET', '/users', ' ', true);
      return response.data as unknown as FetchedUsers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const disableAccount = createAsyncThunk(
  'users/disableAccount',
  async ({ userId, reasons }: { userId: string; reasons: any }, thunkAPI) => {
    try {
      const response = await axiosRequest(
        'POST',
        `/users/${userId}/account-status`,
        reasons,
        true
      );
      return response.data as UserState;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const usersSlice = createSlice({
  name: 'registereUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
        state.success = false;
        state.users = null;
      })
      .addCase(disableAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(disableAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (state.users) {
          const index = state.users.data.findIndex(
            user => user.id === action.meta.arg.userId
          );
          if (index !== -1) {
            state.users.data[index].status = false;
          }
        }
        state.message = action.payload.message;
        state.success = true;
      })
      .addCase(disableAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to disable account';
        state.success = false;
      });
  }
});

export default usersSlice.reducer;
