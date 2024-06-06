'use client';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCT_ICONS, TOP_MENUS } from '@/utils/siteNavigation';
import { FaAngleDown } from 'react-icons/fa';
import { IoMenuOutline, IoSearchSharp } from 'react-icons/io5';
import { BsCart3 } from 'react-icons/bs';
import { Search } from '../formElements/Search';
import { useAppDispatch } from '@/redux/hooks/hook';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProducts } from '@/redux/slices/ProductSlice';
import TopNav from './TopNav';

const ProductNav: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useSelector((state: RootState) => state.products);
  const [searchData, setSearchData] = useState<string>('');
  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchData(e.target.value);
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    currentParams.forEach((value, key) => newParams.append(key, value));

    const queryString = newParams.toString();
    const queryParamsObject: Record<string, string> = {};
    newParams.forEach((value, key) => {
      queryParamsObject[key] = value;
    });

    router.push(`?${queryString}`);
    dispatch(getProducts(queryParamsObject));
  }, [router, dispatch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    currentParams.forEach((value, key) => newParams.append(key, value));
    newParams.set('name', searchData);

    const queryString = newParams.toString();
    const queryParamsObject: Record<string, string> = {};
    newParams.forEach((value, key) => {
      queryParamsObject[key] = value;
    });

    router.push(`?${queryString}`);
    dispatch(getProducts(queryParamsObject));
    return null;
  };

  return (
    <div className="w-full flex flex-col h-30 mt-0 z-50 bg-main-100 fixed top-0 left-0 text-main-100">
      <TopNav />
      <nav className="w-full flex justify-between items-center py-0.5 shadow-sm px-4">
        <span
          className="hidden  text-sm font-bold cursor-pointer border px-4 py-1 text-main-400 lg:flex items-center justify-between gap-4 rounded-md"
          onClick={() => handleNavigation('/')}
        >
          <span className="flex">
            <IoMenuOutline />
          </span>
          CATEGORIES
          <FaAngleDown />
        </span>
        <Search
          loading={loading && searchData !== ''}
          onChange={e => handleChange(e)}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          value={searchData}
          placeholder="Search here ..."
        />
        <div className="w-min hidden lg:flex lg:flex-row justify-end gap-3">
          <Link
            href="/cart"
            className="relative flex flex-col items-center justify-center cursor-pointer text-black p-1"
          >
            <BsCart3 size={32} />
            <span className="absolute top-0 right-0 bg-main-400 text-sm text-main-100 font-bold p-0.5 px-1 rounded-full">
              {0}
            </span>
            <label className="text-xxs text-black">CART</label>
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

export default ProductNav;
