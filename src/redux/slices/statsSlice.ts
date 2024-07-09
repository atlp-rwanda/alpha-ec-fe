import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface StatsState {
  data: {
    newProducts: number;
    expiredProducts: number;
    stockIncrement: number;
    stockReduction: number;
    productWished: number;
  };
  startDate: Date | null;
  endDate: Date | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatsState = {
  data: {
    newProducts: 0,
    expiredProducts: 0,
    stockIncrement: 0,
    stockReduction: 0,
    productWished: 0
  },
  startDate: null,
  endDate: null,
  loading: false,
  error: null
};

export const fetchStats = createAsyncThunk(
  'stats/fetchStats',
  async ({ startDate, endDate }: { startDate: string; endDate: string }) => {
    const response = await axios.get(
      `/api/stats?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data.stats;
  }
);

const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setStartDate(state, action) {
      state.startDate = action.payload;
    },
    setEndDate(state, action) {
      state.endDate = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchStats.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stats';
      });
  }
});

export const { setStartDate, setEndDate } = statsSlice.actions;
export default statsSlice.reducer;
