'use client';

import React, { useState } from 'react';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCT_ICONS, TOP_MENUS } from '@/utils/siteNavigation';
import { FaAngleDown } from 'react-icons/fa';
import { IoMenuOutline, IoSearchSharp } from 'react-icons/io5';
import { BsCart3 } from 'react-icons/bs';
import TopNav from './TopNav';
import { boolean } from 'joi';
import PageLoading from '../Loading/PageLoading';

const MainNav: FC = () => {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const handleNavigation = (url: string) => {
    setPageLoading(true);
    router.push(url);
    setPageLoading(false);
  };

  if (pageLoading) return <PageLoading />;

  return (
    <div className="w-full flex flex-col h-30 mt-0 z-30 bg-main-100 fixed top-0 left-0 text-main-100">
      <TopNav />
      <nav className="w-full flex justify-between items-center py-0.5 shadow-sm px-4">
        <span
          className="text-sm font-bold cursor-pointer border px-4 py-1 text-main-400 flex items-center justify-between gap-4 rounded-md"
          onClick={() => handleNavigation('/')}
        >
          <span className="flex">
            <IoMenuOutline />
          </span>
          CATEGORIES
          <FaAngleDown />
        </span>
        <div className="flex justify-between w-min">
          {TOP_MENUS.map((menu, index) => (
            <div
              key={index}
              className={`block py-1 px-4 rounded transition-colors duration-200  text-gray-400 hover:bg-gray-100'}`}
            >
              <Link
                href={menu.url}
                passHref
                className="text-main-400 hover:underline cursor-pointer"
              >
                {menu.icon && <menu.icon />}
                <span>{menu.label}</span>
              </Link>
            </div>
          ))}
        </div>
        <div className="w-min flex flex-row justify-end gap-3">
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

export default MainNav;
