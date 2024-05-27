import { createAction } from '@reduxjs/toolkit';
import { Post } from '../slices/postSlice';

export const addPost = createAction<Post>('posts/addPost');
export const deletePost = createAction<number>('posts/deletePost');
