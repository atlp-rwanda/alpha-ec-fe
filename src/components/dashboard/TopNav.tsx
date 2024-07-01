'use client';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { CiBrightnessDown } from 'react-icons/ci';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaMessage } from 'react-icons/fa6';
import SideNav from './SideNav';
import Image from 'next/image';

type topBar = {
  paths?: string[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: React.ReactNode;
};

const TopNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className=" flex justify-between items-center bg-[#A5C9CA] py-1 px-5 sm:mx-8 md:mx-8 lg:mx-8 mx-2 my-2 rounded-md shadow-md">
        <div className="flex align-middle">
          <BiMenuAltLeft
            className="text-2xl text-[#32475C] sm:hidden lg:hidden xl:hidden cursor-pointer "
            onClick={toggleSidebar}
          />
          <FiSearch className="text-2xl text-[#32475C]" />
          <div className=" w-full h-full ">
            <input
              className=" w-full h-full focus:outline-none "
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-lg">
            <i className="fas fa-bell"></i>
          </button>
          <button className="text-lg">
            <i className="fas fa-sun"></i>
          </button>
          <button className="text-lg">
            <i className="fas fa-sun"></i>
            <FaMessage />
          </button>
          <div className="flex gap-3">
            <IoIosNotificationsOutline className="text-4xl text-black py-1" />
            <CiBrightnessDown className="text-4xl text-black py-1" />
            <Image
              src="https://via.placeholder.com/40"
              alt="Profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      </div>
      <div className=" z-90 h-full ml-2 mt-[-14px] mb-[20px] w-[430px] relative ">
        {isSidebarOpen && (
          <SideNav
            className={` h-[554px]  [scrollbar-width:none] 
      [&::-webkit-scrollbar]:hidden z-[100] `}
          />
        )}
      </div>
    </div>
  );
};

export default TopNav;
