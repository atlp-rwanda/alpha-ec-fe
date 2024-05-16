import React from 'react';
import type { Metadata } from 'next';
import ProductNav from '@/components/siteNavigation/ProductsNav';
import ProductsSideNav from '@/components/siteNavigation/ProductsSideNav';

export const metadata: Metadata = {
  title: 'products',
  description: 'products'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="gap-0 flex-col">
      <ProductNav />
      <div className="flex justify-between -mt-3 gap-4 min-w-screen p-0 w-full z-0">
        <ProductsSideNav />
        {children}
      </div>
    </div>
  );
}
