'use client';

import { ProductInterface } from '@/redux/slices/ProductSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { GetStars } from '../reviews/GetStars';
import { FaCartPlus } from 'react-icons/fa';
import { imagePath } from '@/utils/Functions';
import PageLoading from '../Loading/PageLoading';

interface ProductCard {
  product: ProductInterface;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleProductClick = async () => {
    setLoading(true);
    try {
      await router.push(`/products/details?productId=${product.id}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoading />;

  return (
    <article
      className="relative w-full flex flex-col overflow-hidden border border-main-100 hover:shadow-md cursor-pointer bg-white rounded-xl shadow-sm "
      key={product.id}
    >
      <div className="w-full" onClick={handleProductClick}>
        <div
          className={`overflow-hidden aspect-w-1 aspect-h-1 h-72 flex flex-col items-center justify-between relative`}
        >
          {product.bonus && (
            <div className="rounded-full bg-main-400 absolute p-2 text-xs z-30 top-1 right-1 text-main-100">
              -{product.bonus}%
            </div>
          )}
          <div className="h-3/4 overflow-hidden w-full flex items-end">
            <Image
              width={200}
              height={200}
              src={product.images[1]}
              alt="Product image"
              className="w-auto object-cover justify-self-end transition-all duration-300 hover:scale-125 animate__animated animate__faster animate__fadeIn"
            />
          </div>
          <div className="w-full h-1/3 flex flex-col gap-0.5 p-3 animate__animated animate__faster animate__fadeIn">
            <div className="flex justify-between w-full items-center">
              <p className="font-bold text-xs uppercase truncate">
                {product.name}
              </p>
              <p className="font-thin text-xs"></p>
            </div>
            <div>
              <GetStars rating={product.averageRatings || 0} />
            </div>
            {/* <span className="truncate text-sm" dangerouslySetInnerHTML={{ __html: item.description }} /> */}
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
              <FaCartPlus
                size={28}
                className="text-main-200 hover:text-main-300 animate__animated animate__faster"
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
