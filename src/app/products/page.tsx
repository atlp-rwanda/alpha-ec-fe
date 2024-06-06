'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import ProductListing from '@/components/products/ProductListing';
import ProductLoading from '@/components/Loading/ProductsLoading';

export default function Home() {
  const router = useRouter();

  const { data, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  if (loading) return <ProductLoading />;
  if (error) return <div>Error: {error.message}</div>;
  if (data) return <ProductListing data={data} />;
}
