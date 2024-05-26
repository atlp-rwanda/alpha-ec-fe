import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addPost, deletePost } from '../actions/postActions';

export interface Post {
  id: number;
  title: string;
  description: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: []
};

export const addPostThunk = createAsyncThunk(
  'posts/addPost',
  async (post: Post, { dispatch }) => {
    dispatch(addPost(post));
    return post;
  }
);

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async (postId: number, { dispatch }) => {
    dispatch(deletePost(postId));
    return postId;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addPost, (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost, (state, action: PayloadAction<number>) => {
        state.posts = state.posts.filter(post => post.id !== action.payload);
      });
  }
});

export default postsSlice.reducer;
