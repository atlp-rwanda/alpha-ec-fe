'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      router.push('/');
    }
  }, [router, token]);

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
