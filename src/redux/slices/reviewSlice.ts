// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { FormErrorInterface, axiosRequest } from '@/utils';

// export interface Product {
//   name: string;
//   price: string;
//   quantity: string;
//   description: string;
//   categoryId?: string;
//   expiryDate?: string;
//   images?: File[];
// }

// export interface ReviewerInterface {
//   name: string;
//   email: string;
//   photoUrl: string | null;
// }

// export interface ReplyInterface {
//   id: string;
//   repliedBy: ReviewerInterface;
//   feedback: string;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface AddReviewInterface {
//   productId: string;
//   rating: number;
//   feedback: string;
// }

// export interface ReviewInterface extends AddReviewInterface {
//   id: string;
//   reviewedBy: ReviewerInterface;
//   repliesCount: number;
//   replies: ReplyInterface[];
//   createdAt: string;
//   updatedAt: string;
// }

// export interface ProductState {
//   product: Product | null;
//   status: 'idle' | 'loading' | 'succeeded' | 'failed';
//   error: string | null;
//   reviews: ReviewInterface[] | null;
//   loadingReviews: boolean;
//   success: boolean;
// }

// const initialState: ProductState = {
//   product: null,
//   status: 'idle',
//   error: null,
//   reviews: null,
//   loadingReviews: false,
//   success: false
// };

// export const getReviews = createAsyncThunk(
//   'products/getReview',
//   async (productId: string, { rejectWithValue }) => {
//     try {
//       const response = await axiosRequest(
//         'GET',
//         `/reviews?productId=${productId}`
//       );

//       return response.data.data.allReviews as ReviewInterface[];
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addReview = createAsyncThunk(
//   'products/addReview',
//   async (review: AddReviewInterface, { rejectWithValue }) => {
//     try {
//       const response = await axiosRequest('POST', '/reviews', review, true);
//       return response.data.data.review as ReviewInterface;
//     } catch (error: any) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const reviewSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {},
//   extraReducers: builder => {
//     builder
//       .addCase(getReviews.pending, state => {
//         state.loadingReviews = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(getReviews.fulfilled, (state, action) => {
//         state.reviews = action.payload;
//         state.loadingReviews = false;
//         state.error = null;
//         state.success = true;
//       })
//       .addCase(getReviews.rejected, (state, action) => {
//         state.reviews = null;
//         state.loadingReviews = false;
//         state.error = (action.payload as FormErrorInterface).message;
//       })
//       .addCase(addReview.pending, state => {
//         state.loadingReviews = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(addReview.fulfilled, (state, action) => {
//         state.loadingReviews = false;
//         state.error = null;
//         if (state.reviews) {
//           state.reviews.push(action.payload as ReviewInterface);
//         } else {
//           state.reviews = [action.payload as ReviewInterface];
//         }
//         state.success = true;
//       })
//       .addCase(addReview.rejected, (state, action) => {
//         state.loadingReviews = false;
//         state.error = (action.payload as FormErrorInterface).message;
//       });
//   }
// });

// export default reviewSlice.reducer;
