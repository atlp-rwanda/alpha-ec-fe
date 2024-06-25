'use client';

import { useAppDispatch } from '@/redux/hooks/hook';
import { getCategories } from '@/redux/slices/categorySlice';
import { getSellers } from '@/redux/slices/sellerSlice';
import { RootState } from '@/redux/store';
import { filter } from 'lodash';
import React, { useEffect } from 'react';
import { FC } from 'react';
import { FaCircle, FaPhoneAlt, FaShopify } from 'react-icons/fa';
import { MdLocationPin, MdOutlineEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Footer: FC = () => {
  const dispatch = useAppDispatch();
  const { data, loadingSellers } = useSelector(
    (state: RootState) => state.sellers
  );

  const { categoriesLoading, error, categoriesData } = useSelector(
    (state: RootState) => state.categories
  );

  //   const handleNavigation = (url: string) => {
  //     router.push(url);
  //   };

  useEffect(() => {
    if (categoriesData === null && !categoriesLoading && error === null) {
      dispatch(getCategories());
    }
  }, [dispatch, categoriesData, categoriesLoading]);

  useEffect(() => {
    if (data === null && !loadingSellers && error === null) {
      dispatch(getSellers());
    }
  }, [data, dispatch, loadingSellers, error]);

  return (
    <div className="w-full flex flex-col h-full gap-4 mt-0 z-40 bg-main-150 text-main-100 shadow-md border-t-main-400 border-t-1">
      <nav className="w-full bg-main-200 flex justify-end items-center p-4 gap-2">
        {/* <div className="border bg-main-100 h-12 w-1/2 rounded-md">
          <input className="border bg-main-100 h-12 w-full px-2 rounded-md focus:border-main-400" />
        </div> */}
      </nav>
      <div className="w-full sm:flex-col gap-8 p-6 md:flex md:flex-row justify-center bg-main-150 min-h-96 text-main-400 sm:gap-8 sm:p-12 md:gap-16 md:p-16 lg:gap-28 lg:p-28">
        <div className="flex flex-col gap-3">
          <span className="font-bold relative h-9">
            CONTACT US
            <span className="border-b-4 w-2/5 absolute left-0 bottom-0"></span>
          </span>

          <ul className="flex flex-col text-xs sm:text-sm md:text-md font-light gap-2">
            <li className="flex items-center gap-2">
              <MdLocationPin />
              Kigali, Rwanda
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              (+250) 780 111 110
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineEmail />
              alpha@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <MdLocationPin />
              Kigali, Rwanda
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt />
              (+250) 780 111 110
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineEmail />
              alpha@gmail.com
            </li>
          </ul>
        </div>
        <div className="flex flex-col pt-4 md:pt-0 gap-3">
          <span className="font-bold relative h-9 uppercase">
            Top Sellers
            <span className="border-b-4 w-2/5 absolute left-0 bottom-0"></span>
          </span>

          <ul className="flex flex-col text-xs sm:text-sm md:text-md font-light gap-2">
            {data &&
              data.slice(0, 5).map((itm, index) => (
                <li
                  className="flex items-center gap-2 hover:underline cursor:pointer"
                  key={index}
                >
                  <FaShopify />
                  {itm.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3 pt-4 md:pt-0">
          <span className="font-bold relative h-9 uppercase truncate">
            Shop by Categories
            <span className="border-b-4 w-2/5 absolute left-0 bottom-0"></span>
          </span>

          <ul className="flex flex-col text-xs sm:text-sm md:text-md font-light gap-2">
            {categoriesData &&
              categoriesData.slice(0, 5).map((itm, index) => (
                <li
                  className="flex items-center gap-2 hover:underline cursor:pointer"
                  key={index}
                >
                  <FaCircle />
                  {itm.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <nav className="w-full bg-main-200 text-xs sm:text-sm md:text-md flex justify-center text-main-400 items-center p-4 gap-2">
        © 2024 ATLP -29 Designed by TeamAlpha
      </nav>
    </div>
  );
};

export default Footer;
