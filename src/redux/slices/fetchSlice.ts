import { axiosRequest } from '@/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface Users {
  id: string;
  name: string;
  email: string;
  address: string;
  gender: string;
  birthdate: string;
  photoUrl: string;
  status: boolean;
  roleId: string;
}

interface FetchedUsers {
  slice(indexOfFirstUser: number, indexOfLastUser: number): unknown;
  message: string;
  data: Users[];
}

export interface UserState {
  users: FetchedUsers | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: null,
  loading: false,
  error: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest('GET', `/users`, ' ', true);
      return response.data as unknown as FetchedUsers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const fetchSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  }
});

export default fetchSlice.reducer;
