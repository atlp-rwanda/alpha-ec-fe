'use client';

import React, { useState } from 'react';
import { MdOutlineAddchart } from 'react-icons/md';
import ProductCard from './ProductCard';
import { ToastContainer } from 'react-toastify';
import Image from 'next/image';
import { ProductDataInterface, getProducts } from '@/redux/slices/ProductSlice';
import Pagination from '../pagination/Pagination';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { RootState } from '@/redux/store';
import { USER_ROLE } from '@/redux/slices/userSlice';
import { GetStars } from '../reviews/GetStars';
import { Button, ButtonStyle } from '../formElements';
import { IoIosCloseCircle, IoIosCloseCircleOutline } from 'react-icons/io';
import { CiEdit } from 'react-icons/ci';
interface ProductListingProps {
  data: ProductDataInterface;
}

const ProductListing: React.FC<ProductListingProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { products, totalItems, totalPages, from } = data;

  const items = Math.ceil(totalItems / totalPages);
  const currentPage =
    parseInt(searchParams.get('page') || '1') || Math.ceil(from / items);

  const dispatch = useAppDispatch();

  const setNewPage = (page: number) => {
    const currentParams = new URLSearchParams(window.location.search);
    const newParams = new URLSearchParams();
    currentParams.forEach((value, key) => newParams.append(key, value));
    newParams.set('page', page.toString());

    const queryString = newParams.toString();
    const queryParamsObject: Record<string, string> = {};
    newParams.forEach((value, key) => {
      queryParamsObject[key] = value;
    });

    router.push(`?${queryString}`);
    dispatch(getProducts(queryParamsObject));
    return;
  };

  const { role } = useAppSelector((state: RootState) => state.user);
  const { userRole } = useAppSelector((state: RootState) => state.otp);

  const loggedIn = userRole || role || 'buyer';

  return (
    <>
      {/* <ProductNav /> */}
      <div className="flex justify-between m-0 gap-4 min-w-screen p-0 w-full z-0">
        <div className="min-h-screen bg-white hidden lg:flex flex-col lg:w-1/5"></div>

        <section className="sm:py-4 w-full p-2 flex flex-col gap-2 ">
          <div className=" flex justify-between w-full h-min pt-2">
            <h2 className="text-xl font-bold flex gap-3 items-center pl-2">
              <MdOutlineAddchart />
              <span>All products</span>
            </h2>
          </div>

          <div className=" w-full p-1 rounded-lg overflow-y-auto">
            {loggedIn === USER_ROLE.SELLER ? (
              <table className="min-w-full text-sm text-left">
                <thead>
                  <tr>
                    <th className="p-2 w-min">Image</th>
                    <th className="hidden md:table-cell p-2 truncate">Name</th>
                    <th className="p-2 truncate">Price</th>
                    <th className="p-2 truncate">Quantity</th>
                    <th className="hidden md:table-cell p-2 truncate">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="gap-2">
                  {products &&
                    products.map((product, i) => (
                      <tr
                        key={i}
                        className="cursor-pointer text-gray-700 hover:bg-accent-200 hover:text-accent-900 bg-white rounded-md text-lg p-2 mb-2 border-b border-main-200"
                      >
                        <td className="hidden md:table-cell p-2 font-bold h-full overflow-hidden items-center">
                          <Image
                            width={120}
                            height={120}
                            src={product.images[0]}
                            alt="Product image"
                            className="object-cover transition-transform duration-300 hover:scale-125"
                          />
                        </td>
                        <td className="p-2 truncate font-bold">
                          <p className="font-bold text-sm md:text-sm lg:text-lg uppercase truncate">
                            {product.name}
                          </p>
                          <GetStars rating={product.averageRatings || 0} />
                        </td>
                        <td className="p-2 truncate text-sm md:text-sm lg:text-lg font-bold">
                          $ {product.price.toLocaleString()}
                        </td>
                        <td className="p-2 truncate">{product.quantity}</td>
                        <td className="hidden p-2 font-bold h-full gap-4 overflow-hidden items-center mt-1 md:flex">
                          <CiEdit size={34} />

                          <IoIosCloseCircle size={34} />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            ) : (
              <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-xl overflow-y-auto">
                {products &&
                  products.map(product => (
                    <ProductCard product={product} key={product.slug} />
                  ))}
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div className="mt-1 flex justify-between items-center self-end">
              <Pagination
                totalItems={totalItems}
                itemsPerPage={totalItems / totalPages}
                currentPage={currentPage}
                onPageChange={(page: number) => setNewPage(page)}
              />
            </div>
          )}
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductListing;
