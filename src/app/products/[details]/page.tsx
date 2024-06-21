'use client';

import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import { IoAdd } from 'react-icons/io5';
import { HiMinusSmall } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getProductDetails, showSideNav } from '@/redux/slices/ProductSlice';
import { Button, ButtonStyle } from '@/components/formElements';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import ProductsDetailsNav from '@/components/siteNavigation/ProductsDetailsNav';
import { CiHeart } from 'react-icons/ci';
import Slider from '@/components/Images/Slider';
import PageLoading from '@/components/Loading/PageLoading';
import { addWishlist, fetchWishes } from '@/redux/slices/wishlistSlice';
import useToast from '@/components/alerts/Alerts';
import { FormErrorInterface } from '@/utils';
import { FaHeart } from 'react-icons/fa';
import { addToCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Details = () => {
  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [quantity2, setQuantity] = useState<number>(1);

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const wishlist = useAppSelector(
    (state: RootState) => state.wishlist.wishlist?.rows || []
  );
  const wishStatus = useAppSelector(
    (state: RootState) => state.wishlist.status
  );
  const cartStatus = useAppSelector((state: RootState) => state.cart.status);

  useEffect(() => {
    dispatch(fetchWishes());
  }, [dispatch]);

  const isInWishlist = wishlist.some(
    wishlistItem => wishlistItem.id === productId
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

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!productId) {
      return (
        <div className=" flex justify-center items-center w-full h-full text-grayborder-b-2 mb-4 border-gray text-[22px]">
          No product id available
        </div>
      );
    }
    const result = await dispatch(addWishlist({ productId: productId }));

    if (wishStatus === 'succeeded') {
      const successMessage = result.payload.message;
      toast.success(successMessage || `Product added to wishlist`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    } else if (wishStatus === 'failed' && result.payload) {
      const errorMessage =
        (result.payload as FormErrorInterface).message || 'An error occurred';
      toast.error(errorMessage || `Adding to wishlist failed!`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    }
  };

  const addCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!productId) {
      return (
        <div className=" flex justify-center items-center w-full h-full text-grayborder-b-2 mb-4 border-gray text-[22px]">
          No product id available
        </div>
      );
    }
    const quantity3 = quantity2.toString();
    const result = await dispatch(
      addToCart({ productId: productId, quantity: quantity3 })
    );

    if (cartStatus === 'succeeded') {
      toast.success(`Product added to CART`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    } else if (cartStatus === 'failed' && result.payload) {
      const errorMessage =
        (result.payload as FormErrorInterface).message || 'An error occurred';
      toast.error(errorMessage || `Adding to cart failed!`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    }
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
              <div className="flex w-full flex-col gap-4 lg:flex-row justify-between p-6 h-auto pt-20">
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
                        selectedProduct.product.price * quantity2
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
                        value={quantity2}
                        onChange={e => setQuantity(Number(e.target.value))}
                        className="w-12 bg-transparent text-center h-full "
                      />
                      <IoAdd
                        onClick={handleAdd}
                        className="w-12 hover:bg-black hover:text-white h-full p-2"
                      />
                    </div>
                    <span
                      className="h-full flex items-center gap-1 cursor-pointer font-thin hover:font-light truncate"
                      onClick={toggleWishlist}
                    >
                      {isInWishlist ? (
                        <FaHeart size={28} className="text-main-300" />
                      ) : (
                        <CiHeart size={30} className="text-main-300" />
                      )}{' '}
                      Add to wish list
                    </span>
                  </div>
                  <span
                    onClick={e => {
                      addCart(e);
                    }}
                    className="xs:w-full lg:w-2/3"
                  >
                    <Button
                      disabled={loading}
                      label={'Add to cart'}
                      style={ButtonStyle.DARK}
                      loading={loading}
                    />
                  </span>
                </div>
              </div>
            </Suspense>
          </>
        )
      )}
      <ToastContainer />
    </>
  );
};

export default Details;
