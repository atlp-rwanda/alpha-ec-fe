// src/redux/slices/assignroleSlice.ts

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosRequest } from '@/utils';

interface AssignRoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: null;
  userId: string | null;
  roleId: string | null;
}

const initialState: AssignRoleState = {
  loading: false,
  success: false,
  error: null,
  message: null,
  userId: null,
  roleId: null
};

export const assignRole = createAsyncThunk(
  'roles/assignRole',
  async (
    { userId, roleId }: { userId: string; roleId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosRequest(
        'POST',
        `/users/roles`,
        { userId, roleId },
        true
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const assignRoleSlice = createSlice({
  name: 'assignRole',
  initialState,
  reducers: {
    updateUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    updateRoleId(state, action: PayloadAction<string>) {
      state.roleId = action.payload;
    },
    clearAssignRoleState(state) {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.userId = null;
      state.roleId = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(assignRole.pending, state => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(assignRole.fulfilled, state => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(assignRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload
          ? (action.payload as any).message
          : 'Unknown error';
      });
  }
});

export const { updateUserId, updateRoleId, clearAssignRoleState } =
  assignRoleSlice.actions;

export default assignRoleSlice.reducer;
