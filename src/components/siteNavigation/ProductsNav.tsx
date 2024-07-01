'use client';

import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCT_ICONS, TOP_MENUS } from '@/utils/siteNavigation';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { IoMenuOutline, IoSearchSharp } from 'react-icons/io5';
import { BsCart3 } from 'react-icons/bs';
import { Search } from '../formElements/Search';
import { useAppDispatch } from '@/redux/hooks/hook';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProducts } from '@/redux/slices/ProductSlice';
import TopNav from './TopNav';
import {
  CategoryAttributes,
  getCategories
} from '@/redux/slices/categorySlice';
import { VscMenu } from 'react-icons/vsc';
import { GrClose } from 'react-icons/gr';
import Filters from './Filter';
import { CiHeart } from 'react-icons/ci';
import { useAppSelector } from '@/redux/hooks/hook';
import { fetchWishes } from '@/redux/slices/wishlistSlice';
import { fetchCart } from '@/redux/slices/cartSlice';

const initialCategory: CategoryAttributes = {
  id: '',
  name: 'All categories',
  description: 'All categories'
};

const ProductNav: FC = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryAttributes>(initialCategory);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { loading, data } = useSelector((state: RootState) => state.products);
  const { categoriesLoading, error, success, categoriesData } = useSelector(
    (state: RootState) => state.categories
  );

  const { wishlist, status } = useAppSelector(
    (state: RootState) => state.wishlist
  );
  const { wishlist2 } = useAppSelector((state: RootState) => state.wishlist);
  const { cart } = useAppSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchWishes());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // const { loading } = useSelector((state: RootState) => state.products);
  const [searchData, setSearchData] = useState<string>('');
  const handleNavigation = (url: string) => {
    router.push(url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchData(e.target.value);
  };

  useEffect(() => {
    if (!loading && error === null) {
      const currentParams = new URLSearchParams(window.location.search);
      const newParams = new URLSearchParams();
      currentParams.forEach((value, key) => newParams.append(key, value));

      if (selectedCategory !== initialCategory) {
        newParams.set('categoryId', selectedCategory.id);
      } else {
        newParams.delete('categoryId');
      }

      const queryString = newParams.toString();
      const queryParamsObject: Record<string, string> = {};
      newParams.forEach((value, key) => {
        queryParamsObject[key] = value;
      });

      router.push(`?${queryString}`);
      dispatch(getProducts(queryParamsObject));
    }

    if (categoriesData === null && !categoriesLoading && error === null) {
      dispatch(getCategories());
    }
  }, [router, dispatch, categoriesData, categoriesLoading, selectedCategory]);

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
      <nav
        className="w-full flex justify-between items-center py-0.5 px-4 gap-2"
        onClick={() => {
          setShowMenu(false);
        }}
      >
        <div
          className="hidden uppercase min-w-60 relative text-xs font-bold cursor-pointer border px-4 py-1 text-main-400 lg:flex items-center justify-between  rounded-md"
          onClick={() => setShowCategories(!showCategories)}
          onMouseOver={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <span className="flex">
            <IoMenuOutline />
          </span>
          {selectedCategory.name}
          {showCategories ? <FaAngleUp /> : <FaAngleDown />}

          {showCategories && (
            <div className="min-h-screen min-w-full z-30 absolute left-0 top-7 overflow-y-hidden">
              <ul className="bg-main-100 border border-t-0 shadow-sm min-h-screen text-left min-w-full z-30 pt-4 rounded-b-md left-0 top-7 animate__animated animate__fadeInDown animate__faster">
                <li
                  onClick={() => setSelectedCategory(initialCategory)}
                  className={`w-full p-1 px-4 border-x-transparent  ${selectedCategory === initialCategory ? 'border font-bold' : ''} hover:bg-main-200  uppercase`}
                >
                  All
                </li>
                {categoriesData &&
                  categoriesData.map(category => (
                    <li
                      key={category.id}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full p-1 px-4 border-x-transparent  ${selectedCategory === category ? 'border font-bold' : ''} hover:bg-main-200  uppercase`}
                    >
                      {category.name}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        <Search
          loading={loading && searchData !== ''}
          onChange={e => {
            handleChange(e);
          }}
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          value={searchData}
          placeholder="Search here ..."
        />
        <span
          onClick={e => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="flex cursor-pointer lg:hidden z-40 max-w-12 min-w-12 text-main-400 h-9 items-center justify-center bg-main-100 shadow-md border  mt-4 p-2 rounded-md"
        >
          {!showMenu ? (
            <VscMenu size={24} className="animate__animated  animate__faster" />
          ) : (
            <GrClose
              size={24}
              className="animate__animated animate__rotateIn animate__faster"
            />
          )}
        </span>
        <div className="w-min hidden lg:flex lg:flex-row justify-end gap-3">
          <Link
            href="/dashboard/cart"
            className="relative flex flex-col items-center justify-center cursor-pointer text-black p-1"
          >
            <BsCart3 size={24} />
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
              {wishlist?.count || wishlist2?.count || 0}
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
                  {item.icon && <item.icon size={24} />}
                  <label className="text-xxs text-black">{item.label}</label>
                </Link>
              )
          )}
        </div>
        {showMenu === true && (
          <div
            onClick={e => {
              e.stopPropagation();
              setShowMenu(false);
            }}
            className="fixed z-30 mt-0.5 border-t-2 top-20 w-screen min-h-screen bg-black bg-opacity-50 shadow-lg lg:hidden right-0 flex justify-end"
          >
            <div
              onClick={e => {
                e.stopPropagation();
              }}
              className="border-2 gap-4 mt-0.5 p-4 animate__animated animate__fadeInRight animate__faster top-20 fixed z-50 min-w-72 right-0 min-h-screen bg-main-150 shadow-md"
            >
              <div className="w-full flex flex-row justify-center  gap-3">
                <Link
                  href="/dashboard/cart"
                  className="relative flex flex-col items-center justify-center cursor-pointer text-black p-1"
                >
                  <BsCart3 size={24} />
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
                    {wishlist?.count || wishlist2?.count || 0}
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
                        {item.icon && <item.icon size={24} />}
                        <label className="text-xxs text-black">
                          {item.label}
                        </label>
                      </Link>
                    )
                )}
              </div>
              <div
                className=" uppercase min-w-60 relative text-xs font-bold cursor-pointer border px-2 py-1 text-main-400 flex items-center justify-between  rounded-md"
                onClick={() => setShowCategories(!showCategories)}
                onMouseOver={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                <span className="flex">
                  <IoMenuOutline />
                </span>
                {selectedCategory.name}
                {showCategories ? <FaAngleUp /> : <FaAngleDown />}

                {showCategories && (
                  <div className="min-h-screen min-w-full z-30 absolute left-0 top-7 overflow-y-hidden">
                    <ul className="bg-main-150 border border-t-0 shadow-sm min-h-screen text-left min-w-full z-30 pt-4 rounded-b-md left-0 top-7 animate__animated animate__fadeInDown animate__faster">
                      <li
                        onClick={() => {
                          setShowMenu(false);
                          setSelectedCategory(initialCategory);
                        }}
                        className={`w-full p-1 px-4 border-x-transparent  ${selectedCategory === initialCategory ? 'border font-bold' : ''} hover:bg-main-200  uppercase`}
                      >
                        All
                      </li>
                      {categoriesData &&
                        categoriesData.map(category => (
                          <li
                            key={category.id}
                            onClick={() => {
                              setShowMenu(false);
                              setSelectedCategory(category);
                            }}
                            className={`w-full p-1 px-4 border-x-transparent  ${selectedCategory === category ? 'border font-bold' : ''} hover:bg-main-200  uppercase`}
                          >
                            {category.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full h-full text-main-400">
                <Filters onClick={() => setShowMenu(false)} />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default ProductNav;
