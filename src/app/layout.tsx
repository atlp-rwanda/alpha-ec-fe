/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Providers from '@/redux/provider';
import 'animate.css';
import MainNav from '@/components/siteNavigation/MainNav';
import PageLoading from '@/components/Loading/PageLoading';

export const metadata: Metadata = {
  title: 'Alpha',
  description: 'Alpha'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col justify-between min-w-screen bg-main-100 text-main-400 h-auto relative px-0">
            <Suspense fallback={<PageLoading />}>{children}</Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
