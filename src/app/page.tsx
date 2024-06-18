'use client';

import React, { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import MainNav from '@/components/siteNavigation/MainNav';
import PageLoading from '@/components/Loading/PageLoading';

const HomeContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', `"${token}"`);
      router.push('/');
    }
  }, [token, router]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <MainNav />
    </main>
  );
};

export default function Home() {
  return (
    <Suspense fallback={<PageLoading />}>
      <HomeContent />
    </Suspense>
  );
}
