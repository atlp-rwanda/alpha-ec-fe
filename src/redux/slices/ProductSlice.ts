import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, FormErrorInterface } from '@/utils';
import { CategoryAttributes } from './categorySlice';

interface sellerInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProductInterface {
  id: string;
  name: string;
  slug: string;
  images: string[];
  categoryId: string;
  category?: CategoryAttributes;
  price: number;
  expiryDate: Date;
  bonus: string;
  status: boolean;
  quantity: number;
  sellerId: string;
  seller?: sellerInterface;
  averageRatings?: number;
  reviewsCount?: number;
  createdAt: Date;
  updatedAt: Date;
  expired: boolean;
}

export interface ProductDataInterface {
  totalItems: number;
  products: ProductInterface[];
  totalPages: number;
  from: number;
  to: number;
}

export interface SellerInterface {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ProductDetailsInterface {
  product: ProductInterface;
  relatedProducts: ProductInterface[];
  sellerInfo: SellerInterface;
}

interface ProductState {
  data: ProductDataInterface | null;
  selectedProduct: ProductDetailsInterface | null;
  loading: boolean;
  error: FormErrorInterface | null;
  success: boolean;
  showSideNav: boolean;
}

interface ProductsResponse {
  data: ProductDataInterface;
}

export interface ProductQueryInterface {
  name?: string;
  limit?: string;
  page?: number;
  sellerId?: string;
  categoryId?: string;
  priceLessThan?: number;
  priceGreaterThan?: number;
}

const initialState: ProductState = {
  data: null,
  selectedProduct: null,
  loading: false,
  error: null,
  success: false,
  showSideNav: true
};

export const getProductDetails = createAsyncThunk(
  'products/getDetails',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('GET', `/products/${productId}`);
      return response.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'Failed to fetch products');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

export const getProducts = createAsyncThunk(
  'products/search',
  async (productQuery: ProductQueryInterface, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      if (productQuery.name) queryParams.append('name', productQuery.name);
      if (productQuery.limit)
        queryParams.append('limit', productQuery.limit.toString());
      if (productQuery.page)
        queryParams.append('page', productQuery.page.toString());
      if (productQuery.sellerId)
        queryParams.append('sellerId', productQuery.sellerId);
      if (productQuery.categoryId)
        queryParams.append('categoryId', productQuery.categoryId);
      if (productQuery.priceLessThan)
        queryParams.append(
          'priceLessThan',
          productQuery.priceLessThan.toString()
        );
      if (productQuery.priceGreaterThan)
        queryParams.append(
          'priceGreaterThan',
          productQuery.priceGreaterThan.toString()
        );

      const url = `/products?${queryParams.toString()}`;

      const response = await axiosRequest<null, ProductsResponse>(
        'GET',
        url,
        null
      );

      return response.data.data;
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue(err.response.data || 'Failed to fetch products');
      }
      const error = err as Error;
      return rejectWithValue({ message: error.message });
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    showSideNav(state, action) {
      state.showSideNav = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProductDetails.pending, state => {
        state.selectedProduct = null;
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.selectedProduct = null;
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
      })
      .addCase(getProducts.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as FormErrorInterface;
        state.success = false;
      });
  }
});

export default productSlice.reducer;
export const { showSideNav } = productSlice.actions;
