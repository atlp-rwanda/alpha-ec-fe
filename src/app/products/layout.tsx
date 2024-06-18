import React from 'react';
import type { Metadata } from 'next';
import ProductNav from '@/components/siteNavigation/ProductsNav';

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
    <div className="">
      <ProductNav />
      {children}
    </div>
  );
}
