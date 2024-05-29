'use client';
import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hook';
import { addPost, deletePost } from '@/redux/actions/postActions';

const Posts: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const posts = useAppSelector(state => state.posts.posts);
  const dispatch = useAppDispatch();

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: Date.now(),
      title,
      description
    };

    dispatch(addPost(newPost));

    setTitle('');
    setDescription('');
  };

  const handleRemovePost = (postId: number) => {
    dispatch(deletePost(postId));
  };

  return (
    <div className="max-w-2xl mx-auto p-5">
      <form className="flex flex-col mb-5" onSubmit={handleAddPost}>
        <input
          type="text"
          className="p-2 mb-2 bg-white border border-gray-300 text-black"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          className="p-2 mb-2 h-24 bg-white border border-gray-300 text-black"
          onChange={e => setDescription(e.target.value)}
        ></textarea>
        <button
          className="bg-blue-500 text-white border-none p-2 cursor-pointer"
          type="submit"
        >
          Add New Post
        </button>
      </form>
      <h1 className="text-4xl mb-8">Posts</h1>
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.id} className="p-2 mb-2 border border-white w-72">
            <h3 className="text-lg font-bold mb-1">{post.title}</h3>
            <p className="mb-2 text-sm">{post.description}</p>
            <button
              className="bg-red-600 text-white border-none mt-2 p-2 cursor-pointer"
              onClick={() => handleRemovePost(post.id)}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Posts;
