'use client';

import { ProductInterface } from '@/redux/slices/ProductSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GetStars } from '../reviews/GetStars';
import { FaCartPlus, FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { imagePath } from '@/utils/Functions';
import PageLoading from '../Loading/PageLoading';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { addWishlist, fetchWishes } from '@/redux/slices/wishlistSlice';
import useToast from '@/components/alerts/Alerts';
import { FormErrorInterface } from '@/utils';
import { RootState } from '@/redux/store';
import { addToCart, fetchCart, removeFromCart } from '@/redux/slices/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductCard {
  product: ProductInterface;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const router = useRouter();

  const { showSuccess, showError } = useToast();

  const dispatch = useAppDispatch();

  const wishlist = useAppSelector(
    (state: RootState) => state.wishlist.wishlist?.rows || []
  );
  const wishStatus = useAppSelector(
    (state: RootState) => state.wishlist.status
  );

  useEffect(() => {
    dispatch(fetchWishes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const isInWishlist = wishlist.some(
    wishlistItem => wishlistItem.id === product.id
  );
  const { cart } = useAppSelector((state: RootState) => state.cart);
  const cartStatus = useAppSelector((state: RootState) => state.cart.status);

  const [loading, setLoading] = useState(false);

  const handleProductClick = async () => {
    setLoading(true);
    try {
      await router.push(`/products/details?productId=${product.id}`);
    } finally {
      setLoading(false);
    }
  };
  const isInCart = cart?.produtcs?.some(cartItem => cartItem.id === product.id);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const result = await dispatch(addWishlist({ productId: product.id }));

    if (wishStatus === 'succeeded') {
      const successMessage = result.payload.message;
      toast.success(successMessage || 'Product added to wishlist', {
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

    const result = await dispatch(
      addToCart({ productId: product.id, quantity: '1' })
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
  const removeOneCart = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const result = await dispatch(removeFromCart(product.id));

    if (cartStatus === 'succeeded') {
      toast.success(`Product removed from cart`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    } else if (cartStatus === 'failed' && result.payload) {
      const errorMessage =
        (result.payload as FormErrorInterface).message || 'An error occurred';
      toast.error(errorMessage || `Removing from cart failed!`, {
        position: 'top-left',
        style: {
          marginTop: '60px'
        },
        autoClose: 2000
      });
    }
  };

  if (loading) return <PageLoading />;

  return (
    <article
      className="relative w-full flex flex-col overflow-hidden border border-main-100 hover:shadow-md cursor-pointer bg-white rounded-xl shadow-sm group"
      key={product.id}
    >
      <div className="relative w-full" onClick={handleProductClick}>
        <div
          className={`overflow-hidden aspect-w-1 aspect-h-1 h-72 flex flex-col items-center justify-between relative`}
        >
          {product.bonus && (
            <div className="rounded-full bg-main-400 absolute p-2 text-xs z-30 top-1 right-1 text-main-100">
              -{product.bonus}%
            </div>
          )}
          <div className="h-3/4 relative overflow-hidden w-full flex justify-center items-center">
            <Image
              src={product.images[0]}
              alt="Product image"
              layout="fill"
              className="object-cover transition-all duration-300 hover:scale-125 animate__animated animate__faster animate__fadeIn"
            />
          </div>
          <div className="w-full h-1/3 flex flex-col gap-0.5 p-3 animate__animated animate__faster animate__fadeIn relative ">
            <div
              className="absolute top-2 right-3 bg-gray-800 rounded-full z-40 transition-opacity duration-300 "
              onClick={toggleWishlist}
            >
              {isInWishlist ? (
                <FaHeart size={28} className="text-main-300" />
              ) : (
                <CiHeart size={30} className="text-main-300" />
              )}
            </div>
            <div className="flex justify-between w-full items-center">
              <p className="font-bold text-xs uppercase truncate">
                {product.name}
              </p>
              <p className="font-thin text-xs"></p>
            </div>
            <div>
              <GetStars rating={product.averageRatings || 0} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-black text-lg text-main-400 flex items-center gap-2">
                ${' '}
                {product.bonus
                  ? (
                      product.price -
                      (product.price * parseInt(product.bonus)) / 100
                    ).toLocaleString()
                  : product.price.toLocaleString()}
                {product.bonus && (
                  <p className="font-thin text-sm line-through">
                    $ {product.price.toLocaleString()}
                  </p>
                )}
              </span>
              <div>
                {isInCart ? (
                  <FaCartPlus
                    onClick={removeOneCart}
                    size={28}
                    className="text-main-300 hover:text-main-300 animate__animated animate__faster"
                  />
                ) : (
                  <FaCartPlus
                    onClick={addCart}
                    size={28}
                    className="text-main-200 hover:text-main-300 animate__animated animate__faster"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
