/* eslint-disable @next/next/no-page-custom-font */
import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import Providers from '@/redux/provider';
import Head from 'next/head';
// import { Inter } from 'next/font/google';
import 'animate.css';

// const inter = Inter({ subsets: ['latin'] });

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
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col items-center justify-between min-w-screen bg-main-100 sm:h-full lg:h-screen  md:h-full">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
