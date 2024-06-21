import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosRequest } from '@/utils';

export interface User {
  id: string;
  createdAt: string;
  message: string;
  isRead: boolean;
  event: string;
}

export interface FetchedUsers {
  message: string;
  data: User[];
}

export interface NotificationState {
  data: FetchedUsers | null;
  loading: boolean;
  message: string;
  error: string | null;
  success: boolean;
}

const initialState: NotificationState = {
  data: null,
  loading: false,
  message: '',
  error: '',
  success: false
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, thunkAPI) => {
    try {
      const response = await axiosRequest('GET', '/notifications', '', true);
      console.log('haha', response.data);
      return response.data as FetchedUsers;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notifications/markNotificationAsRead',
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosRequest(
        'PUT',
        `/notifications/${id}`,
        {},
        true
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<User>) => {
      if (state.data) {
        state.data.data = [action.payload, ...state.data.data];
      } else {
        state.data = { message: '', data: [action.payload] };
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      if (state.data) {
        state.data.data = state.data.data.filter(
          notification => notification.id !== action.payload
        );
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.message = action.payload.message;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch notifications';
        state.success = false;
        state.data = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const notification = state.data?.data.find(
          notif => notif.id === action.meta.arg
        );
        if (notification) {
          notification.isRead = true;
        }
      })
      .addCase(markNotificationAsRead.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to mark notification as read';
        state.success = false;
      });
  }
});

export const { addNotification, removeNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
