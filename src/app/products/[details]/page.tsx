'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { HiMinusSmall } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProductDetails, showSideNav } from '@/redux/slices/ProductSlice';
import { Button, ButtonStyle } from '@/components/formElements';
import { useAppDispatch } from '@/redux/hooks/hook';
import ProductsDetailsNav from '@/components/siteNavigation/ProductsDetailsNav';
import { CiHeart } from 'react-icons/ci';
import Slider from '@/components/Images/Slider';
import PageLoading from '@/components/Loading/PageLoading';

const Details = () => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [quantity, setQuantity] = useState<number>(1);

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(showSideNav(false));
    productId && dispatch(getProductDetails(productId));
  }, [productId, dispatch]);

  const handleAdd = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleRemove = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        selectedProduct && (
          <>
            <ProductsDetailsNav />
            <Suspense fallback={<div>Loading...</div>}>
              <div className="flex w-full flex-col gap-4 lg:flex-row justify-between p-6 h-auto">
                <div className="w-full h-full lg:w-2/3 flex-col items-center justify-center gap-2 relative">
                  <Slider images={selectedProduct.product.images} />
                </div>
                <div className="w-full mt-4 lg:mt-0 lg:w-1/3 p-0 pt-10 lg:p-4 flex flex-col items-start gap-4 text-black">
                  <span className="flex justify-between border-b-1 border-b-main-300">
                    <h2 className="text-2xl font-bold md:text-3xl">
                      {selectedProduct.product.name}
                    </h2>
                  </span>
                  <p className="text-3xl font-bold">
                    <span className="font-bold">
                      {' '}
                      ${' '}
                      {(
                        selectedProduct.product.price * quantity
                      ).toLocaleString()}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    category:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.category?.name || ''}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    Status:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.status
                        ? 'Available'
                        : 'not Available'}
                    </span>
                  </p>
                  <p className="text-lg font-normal gap-4 flex">
                    Bonus:
                    <span className="font-bold">
                      {' '}
                      {selectedProduct.product.bonus || '0'} %
                    </span>
                  </p>
                  <div className="flex flex-col items-start gap-4 w-full lg:flex-row lg:items-center">
                    <div className="w-1/2 max-w-52 min-w-44 min-h-12 lg:w-1/3 relative truncate flex justify-between items-center p-0 border border-black border-1 cursor-pointer rounded-md">
                      <HiMinusSmall
                        onClick={handleRemove}
                        className="w-12 hover:bg-black hover:text-white h-full p-2"
                      />
                      <input
                        value={quantity}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="w-12 bg-transparent text-center h-full "
                      />
                      <IoAdd
                        onClick={handleAdd}
                        className="w-12 hover:bg-black hover:text-white h-full p-2"
                      />
                    </div>
                    <span className="h-full flex items-center gap-1 cursor-pointer font-thin hover:font-light truncate">
                      <CiHeart size={28} />
                      Add to wish list
                    </span>
                  </div>
                  <span className="xs:w-full lg:w-2/3">
                    <Button
                      disabled={false}
                      label={'Add to cart'}
                      style={ButtonStyle.DARK}
                      loading={false}
                      onClick={() => {}}
                    />
                  </span>
                </div>
              </div>
            </Suspense>
          </>
        )
      )}
    </>
  );
};

export default Details;
