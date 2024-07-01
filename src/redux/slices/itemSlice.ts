import { FormErrorInterface, axiosRequest } from '@/utils';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { StringIterator } from 'lodash';
import { ReactNode } from 'react';

export interface Product {
  name: string;
  price: string;
  quantity: string;
  description: string;
  categoryId?: string;
  expiryDate?: string;
  images?: File[];
}

export interface ReviewerInterface {
  name: string;
  email: string;
  photoUrl: string | null;
  repliedBy: string | null;
  replies: String;
}

export interface ReplyInterface {
  rating: number;
  text: ReactNode;
  id: string;
  repliedBy: ReviewerInterface;
  reviewedBy: string;
  replies: string;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddReviewInterface {
  productId: string;
  rating: number;
  feedback: string;
}

export interface AddReplyInterface {
  reviewId: string;
  feedback: string;
}

export interface ReviewInterface extends AddReviewInterface {
  repliedBy: any;
  id: string;
  reviewedBy: ReviewerInterface;
  repliesCount: number;
  replies: ReplyInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductState {
  product: Product | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  reviews: ReviewInterface[] | null;
  loadingReviews: boolean;
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
  error: null,
  reviews: null,
  loadingReviews: false
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

      const response = await axiosRequest('POST', '/products', formData, true);

      return response.data as Product;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getReviews = createAsyncThunk(
  'products/getReview',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await axiosRequest(
        'GET',
        `/reviews?productId=${productId}`
      );

      return response.data.data.allReviews as ReviewInterface[];
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReview = createAsyncThunk(
  'products/addReview',
  async (review: AddReviewInterface, { rejectWithValue }) => {
    try {
      const response = await axiosRequest('POST', '/reviews', review, true);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addReply = createAsyncThunk(
  'products/addReply',
  async (replyData: AddReplyInterface, { rejectWithValue }) => {
    try {
      const response = await axiosRequest(
        'POST',
        `/reviews/${replyData.reviewId}/replies`,
        { feedback: replyData.feedback },
        true
      );

      return response.data;
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
      })
      .addCase(getReviews.pending, state => {
        state.loadingReviews = true;
        state.error = null;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.loadingReviews = false;
        state.error = null;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.reviews = null;
        state.loadingReviews = false;
        state.error = (action.payload as FormErrorInterface).message;
      })
      .addCase(addReview.pending, state => {
        state.loadingReviews = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loadingReviews = false;
        state.error = null;
        // if (state.reviews) {
        //   state.reviews.push(action.payload as ReviewInterface);
        // } else {
        //   state.reviews = [action.payload as ReviewInterface];
        // }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loadingReviews = false;
        state.error = (action.payload as FormErrorInterface).message;
      })
      .addCase(addReply.pending, state => {
        state.loadingReviews = true;
        state.error = null;
      })
      .addCase(addReply.fulfilled, (state, action) => {
        state.loadingReviews = false;
        state.error = null;
        // Update the specific review with the new reply
        const updatedReply = action.payload as ReplyInterface;
        const reviewIndex = state.reviews?.findIndex(
          review => review.id === updatedReply.reviewedBy
        );
        if (reviewIndex !== undefined && reviewIndex !== -1 && state.reviews) {
          state.reviews[reviewIndex].replies.push(updatedReply);
          state.reviews[reviewIndex].repliesCount += 1;
        }
      })
      .addCase(addReply.rejected, (state, action) => {
        state.loadingReviews = false;
        state.error = (action.payload as FormErrorInterface).message;
      });
  }
});

export default productSlice.reducer;
