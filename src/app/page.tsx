import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <span className="mt-6 mx-auto text-sm text-black">
        Signup?{' '}
        <Link
          href="/register"
          className="text-main-400 font-bold hover:underline hover:font-extrabold"
        >
          SignUp
        </Link>
      </span>
    </main>
  );
}
