'use client';

import React from 'react';
import { MdOutlineAddchart } from 'react-icons/md';
import { ToastContainer } from 'react-toastify';
import LoadingCard from './LoadingCard';
import { useSearchParams } from 'next/navigation';

interface ProductLoadingProps {}

const ProductLoading: React.FC<ProductLoadingProps> = () => {
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get('limit') || '10');
  return (
    <>
      <div className="flex justify-between m-0 gap-4 min-w-screen p-0 w-full z-0">
        <div className="min-h-screen bg-white flex flex-col w-1/5"></div>

        <section className="sm:py-4 w-full p-2 flex flex-col gap-2 ">
          <div className=" flex justify-between w-full h-min pt-2">
            <h2 className="text-xl font-bold flex gap-3 items-center">
              <MdOutlineAddchart />
              <span>All products</span>
            </h2>
          </div>

          <div className=" w-full p-1 rounded-lg overflow-y-auto">
            <div className="w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 rounded-xl overflow-y-auto">
              {Array.from({ length: limit }).map((_, index) => (
                <LoadingCard key={index} />
              ))}
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductLoading;
