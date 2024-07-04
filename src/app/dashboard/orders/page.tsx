'use client';
import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { axiosRequest } from '@/utils';
import { setError, setLoading, setorders } from '@/redux/slices/ordersSlice';
import { useAppSelector, useAppDispatch } from '@/redux/hooks/hook';
import OrderCard from '@/components/order/orderCard';
import PageLoading from '@/components/Loading/PageLoading';

const Page: React.FC = () => {
  const params = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    axiosRequest('GET', '/product-orders', null, true)
      .then(res => {
        dispatch(setorders(res.data.data));
        dispatch(setLoading(false));
        console.log(res.data.data);
      })
      .catch(err => {
        dispatch(setError(err.message));
      });
  }, [dispatch]);

  const { error, loading, orders } = useAppSelector(({ orders }) => orders);

  return (
    <div className="container mx-auto p-4">
      {params.get('status') === 'paid' && (
        <h1 className="text-4xl font-bold text-center my-4">orders👍</h1>
      )}

      {loading && <PageLoading />}
      {error && <h1>Error: {error}</h1>}
      {!loading && !error && orders.length === 0 && <h1>No orders found.</h1>}

      <div className="orders-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Page;
