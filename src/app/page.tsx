import Posts from './posts/post';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <Posts />
    </main>
  );
}
