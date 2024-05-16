'use client';

import React from 'react';
import { FC } from 'react';
import { SellerInterface } from '@/redux/slices/ProductSlice';
import { RootState } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks/hook';
import Filters from './Filter';

export interface FiltersInterface {
  max: number | null;
  min: number | null;
  seller: SellerInterface | null;
}

const ProductsSideNav: FC = () => {
  const { showSideNav } = useAppSelector((state: RootState) => state.products);

  return (
    <div
      className={`min-h-screen px-4 pt-4 hidden lg:flex flex-col ${showSideNav ? 'lg:max-w-min lg:min-w-72' : 'hidden lg:hidden'}  bg-main-150`}
    >
      <div className="fixed">
        <Filters onClick={() => {}} />
      </div>
    </div>
  );
};

export default ProductsSideNav;
