'use client';
import React from 'react';
import Image from 'next/image';

interface OrderCardProps {
  order: {
    id: string;
    orderBuyer: {
      name: string;
      photoUrl: string | null;
    };
    orderedProduct: {
      images: string[];
      name: string;
      price: number;
    };
    quantity: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const { id, orderBuyer, orderedProduct, quantity, status, createdAt } = order;
  const productImage = orderedProduct.images[0];

  return (
    <div className="order-card border rounded-lg p-4 m-[4px]">
      <div className="order-header flex justify-between gap-2">
        <span className="order-id font-normal  text-[10px]">
          Order ID # {id}
        </span>
        <span
          className={`order-status ${status.trim() === 'DELIVERED' ? 'bg-green-200' : 'bg-yellow-200'} px-2  rounded`}
        >
          {status.trim()}
        </span>
      </div>
      <div className="order-content flex items-center mt-4 sm:gap-3 md:gap-3">
        <Image
          width={100}
          height={120}
          src={productImage}
          alt={orderedProduct.name}
          className="w-20 h-20 mr-4"
        />
        <div className="order-details">
          <h2 className="font-bold">{orderedProduct.name}</h2>
          <p>Price: ${orderedProduct.price}</p>
          <p>Quantity: {quantity}</p>
          <p className=" text-sm ">Buyer: {orderBuyer.name}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
