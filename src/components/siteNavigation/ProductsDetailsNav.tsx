'use client';

import React, { useEffect } from 'react';
import { FC } from 'react';
import Link from 'next/link';
import { PRODUCT_ICONS } from '@/utils/siteNavigation';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { BsCart3 } from 'react-icons/bs';
import TopNav from './TopNav';
import { CiHeart } from 'react-icons/ci';
import { useAppSelector } from '@/redux/hooks/hook';
import { fetchWishes } from '@/redux/slices/wishlistSlice';
import { useAppDispatch } from '@/redux/hooks/hook';
import { RootState } from '@/redux/store';
import { fetchCart } from '@/redux/slices/cartSlice';

const ProductsDetailsNav: FC = () => {
  const dispatch = useAppDispatch();
  const { wishlist, status } = useAppSelector(
    (state: RootState) => state.wishlist
  );
  const { cart } = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchWishes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col h-30 mt-0 z-50 bg-main-100 fixed top-0 left-0 text-main-100">
      <TopNav />
      <nav className="w-full flex justify-between items-center py-0.5 shadow-sm px-4">
        <Link
          href="/products"
          className="text-sm font-bold cursor-pointer border mt-4 lg:mt-0 px-2 py-1 text-main-400 flex items-center justify-between gap-4 rounded-md"
        >
          <span className="flex">
            <IoArrowBackCircleOutline size={24} />
          </span>
          <span className="hidden lg:block">BACK</span>
        </Link>
        <div className="hidden w-min lg:flex flex-row justify-end gap-3">
          <Link
            href="dashboard/cart"
            className="relative flex flex-col items-center justify-center cursor-pointer text-black p-1"
          >
            <BsCart3 size={32} />
            <span className="absolute top-0 right-0 bg-main-400 text-sm text-main-100 font-bold p-0.5 px-1 rounded-full">
              {cart?.produtcs?.length || 0}
            </span>
            <label className="text-xxs text-black">CART</label>
          </Link>
          <Link
            href="/dashboard/wishlist"
            className="relative flex flex-col items-center justify-center cursor-pointer text-black p-1"
          >
            <CiHeart size={32} />
            <span className="absolute top-0 right-0 bg-main-400 text-sm text-main-100 font-bold p-0.5 px-1 rounded-full">
              {wishlist?.count || 0}
            </span>
            <label className="text-xxs text-black">WISHLIST</label>
          </Link>
          {PRODUCT_ICONS.map(
            item =>
              item.access === 'all' && (
                <Link
                  href={item.url}
                  key={item.title}
                  className="flex flex-col items-center justify-center cursor-pointer p-1 text-main-400"
                >
                  {item.icon && <item.icon size={32} />}
                  <label className="text-xxs text-black">{item.label}</label>
                </Link>
              )
          )}
        </div>
      </nav>
    </div>
  );
};

export default ProductsDetailsNav;
