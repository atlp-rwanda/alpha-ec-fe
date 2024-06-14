import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  name: string;
  price: string;
  quantity: string;
  status: string;
  bonus: string;
  categoryId?: string;
  expiryDate?: string;
  images?: File[];
}

export interface ProductState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null
};

export const addProduct = createAsyncThunk<Product, Product>(
  'products/addProduct',
  async (product, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(product).forEach(key => {
        if (key === 'images' && product.images) {
          product.images.forEach(image => formData.append('images', image));
        } else {
          formData.append(key, product[key as keyof Product] as string);
        }
      });

      const response = await axios.post(
        'http://localhost:5000/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addProduct.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default productSlice.reducer;
