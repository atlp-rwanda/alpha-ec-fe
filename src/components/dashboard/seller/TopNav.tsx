/* eslint-disable react/jsx-key */
'use client';
import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { CiBrightnessDown } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { fetchNotifications } from '@/redux/slices/notification';
import { BiMenuAltLeft } from 'react-icons/bi';
import SideNav from './SideNav';
import Image from 'next/image';
import useSocket from '@/utils/useSocket';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import { DecodedInterface } from '@/redux/slices/userSlice';
import { formatDate } from '@/utils/formatDate';
import { ReadMore } from './ReadMore';
import Link from 'next/link';

const TopNav = () => {
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { data } = useAppSelector(state => state.notifications);
  const [decoded, setDecoded] = useState<DecodedInterface | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notsPerPage = 3;
  const notifications = data?.data;
  const indexOfLastUser = currentPage * notsPerPage;
  const indexOfFirstUser = indexOfLastUser - notsPerPage;
  const currentNotifications = notifications?.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  useEffect(() => {
    const tokenString = localStorage.getItem('token');
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      const decodedToken = tokenData
        ? (jwtDecode(tokenData) as DecodedInterface)
        : null;
      setDecoded(decodedToken);
    }
  }, [dispatch]);

  const userId: any = decoded?.id;
  useSocket(userId);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const numberOfNotifications = data?.data.length;

  const handleNotificationClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (!isNotificationsOpen) {
      dispatch(fetchNotifications());
    }
  };

  const handleViewAllClick = () => {
    setIsNotificationsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-[#A5C9CA] py-1 px-5 sm:mx-8 md:mx-8 lg:mx-8 mx-2 my-2 rounded-md shadow-md">
        <div className="flex align-middle">
          <BiMenuAltLeft
            className="text-2xl text-[#32475C] sm:hidden lg:hidden xl:hidden cursor-pointer"
            onClick={toggleSidebar}
          />
          <FiSearch className="text-2xl text-[#32475C]" />
          <div className="w-full h-full">
            <input
              className="w-full h-full focus:outline-none"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="text-lg cursor-pointer"
            onClick={handleNotificationClick}
          >
            <i className="fas fa-bell cursor-pointer"></i>
          </button>
          <button className="text-lg cursor-pointer relative">
            <i className="fas fa-sun cursor-pointer"></i>
            <p className="text-xs font-extrabold absolute bottom-0 left-14 transform -translate-x-1/2 translate-y-full">
              {numberOfNotifications}
            </p>
          </button>

          <div className="flex gap-3">
            <IoIosNotificationsOutline
              className="text-4xl text-black py-1 cursor-pointer"
              onClick={handleNotificationClick}
            />
            <CiBrightnessDown className="text-4xl text-black py-1 cursor-pointer" />
            <Image
              src="https://via.placeholder.com/40"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="w-[430px] absolute right-0 top-[8px]">
        {isSidebarOpen && (
          <SideNav className="h-[554px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden z-[100]" />
        )}
        {isNotificationsOpen && (
          <div className="absolute top-16 left-0 bg-main-100 shadow-lg rounded-md p-4 w-80 transition-all duration-300">
            {numberOfNotifications && numberOfNotifications > 0 ? (
              <>
                {currentNotifications?.map((nots, index) => (
                  <div
                    key={index}
                    className="mb-2 p-3 border-b last:border-b-0 hover:bg-gray-100"
                  >
                    <h1 className="text-sm font-semibold pb-1">
                      TITLE:
                      {nots.event === 'PRODUCT_WISHLIST_UPDATE' ? (
                        <>WISHLIST UPDATED</>
                      ) : nots.event === 'PAYMENT_COMPLETED' ? (
                        <>PAYMENT COMPLETED</>
                      ) : (
                        ''
                      )}
                    </h1>
                    <p className="text-sm">
                      <ReadMore message={nots.message} id={nots.id} />
                    </p>
                    <p className="text-xs text-gray-500 pt-2">
                      Received:
                      <strong className="">{formatDate(nots.createdAt)}</strong>
                    </p>
                  </div>
                ))}
                <Link
                  href="../../../dashboard/seller/notifications"
                  className="flex justify-center text-xs text-blue font-bold"
                  onClick={handleViewAllClick}
                >
                  View All
                </Link>
              </>
            ) : (
              <p className="text-center text-gray-500">No notifications</p>
            )}
          </div>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default TopNav;
