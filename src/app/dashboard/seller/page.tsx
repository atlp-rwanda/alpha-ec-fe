'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { fetchNotifications } from '@/redux/slices/notification';
import React, { useEffect } from 'react';
const SellerDashbord = () => {
  const dispatch = useAppDispatch();
  const { data, loading, success, message } = useAppSelector(
    state => state.notifications
  );
  console.log('data---', data);
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
  return (
    <>
      {/* <h1>Seller Dashboard</h1> */}
      {/* {message ? <h1>{message}</h1> : <h1>you</h1>} */}
      {/* {data?.data.map(nots => <>{nots}</>)} */}
    </>
  );
};

export default SellerDashbord;
