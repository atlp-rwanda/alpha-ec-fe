//update product slice
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, FormErrorInterface } from '@/utils';

export interface productData {
  name: string;
  price: string;
  quantity: string;
  description: string;
  categoryId?: string;
  expiryDate?: string;
  images?: File[];
}

export interface ProductResponse {
  status: string;
  data: productData;
  message: string;
}
export interface ProductState {
  product: ProductResponse | null;
  loading: boolean;
  status: 'loading' | 'succeeded' | 'failed';
  error: FormErrorInterface | null;
}

const initialState: ProductState = {
  loading: false,
  product: null,
  status: 'loading',
  error: null
};

export const updateProduct = createAsyncThunk(
  'product/updateProduct',
  async (
    { productId, formData2 }: { productId: string | null; formData2: FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosRequest(
        'PATCH',
        `/products/${productId}`,
        formData2,
        true
      );
      console.log(response.data);
      return response.data;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        const errorResponse =
          err.response.data.data[0].message || err.response.data;
        return rejectWithValue({ message: errorResponse });
      }
      return rejectWithValue({ message: 'An error occurred' });
    }
  }
);

const updateProductSlice = createSlice({
  name: 'updateproduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateProduct.pending, state => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload as unknown as ProductResponse;
        state.loading = false;
      })
      .addCase(updateProduct.rejected, state => {
        state.status = 'failed';
        state.loading = false;
      });
  }
});

export default updateProductSlice.reducer;
