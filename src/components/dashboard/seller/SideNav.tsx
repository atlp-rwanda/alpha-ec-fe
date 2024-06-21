'use client';
import React from 'react';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { MdErrorOutline, MdOutlineManageAccounts } from 'react-icons/md';
import { FcStatistics } from 'react-icons/fc';
import { BsHeart } from 'react-icons/bs';
import { useRouter, usePathname } from 'next/navigation';
import { FaCalendarAlt, FaKey, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineShopping } from 'react-icons/ai';

type SidebarButtonProps = {
  paths?: string[];
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: React.ReactNode;
};
interface SideNavProps1 {
  className?: string;
}

function SidebarButton({
  paths,
  icon,
  children,
  className
}: SidebarButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  if (!paths) {
    return;
  }
  const isActive = paths.includes(pathname);

  const handleClick = () => {
    if (paths) {
      router.push(paths[0] || '');
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-2 ml-[-10px] p-2 ${isActive ? 'bg-[#40586A] text-white rounded' : 'text-black hover:bg-[#40586A]/50 hover:text-white hover:rounded active:bg-[#40586A]/70 transition duration-200 ease-in-out'}`}
    >
      {icon}
      {children}
    </div>
  );
}

const SideNav: React.FC<SideNavProps1> = ({ className }) => {
  return (
    <div
      className={`bg-[#a5c9ca] h-full p-5 fixed sm:relative md:relative overflow-x-auto shadow-md ${className} `}
    >
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold text-[#32475C]">alpha-team</h1>
        </Link>
      </div>
      <nav className="space-y-4 pl-[-38px] text-black z-99">
        <div>
          <SidebarButton paths={[]}>
            <FiHome className="text-2xl" />
            <p>Dashboard</p>
          </SidebarButton>
          <SidebarButton paths={['/profile', '/profile-edit']}>
            <MdOutlineManageAccounts className="text-2xl " />
            <p className="whitespace-nowrap">Account Settings</p>
          </SidebarButton>
        </div>
        <div className="mt-6 ">
          <h2 className="text-xl font-semibold">PAGES</h2>
          <SidebarButton paths={['/change-password']}>
            <FaKey className="text-2xl" />
            <p>Logout</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <FcStatistics className="text-xl" />
            <p className="text-nowrap">Statistics</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <MdErrorOutline className="text-xl" />
            <p className=" text-nowrap">Error</p>
          </SidebarButton>
        </div>
        <div className="mt-6 ">
          <h2 className="text-xl font-semibold">ACTIVITIES</h2>
          <SidebarButton paths={['/change-password']}>
            <BsHeart className="text-2xl" />
            <p>wish list</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <FaShoppingCart className="text-xl" />
            <p className="text-nowrap">Order</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <AiOutlineShopping className="text-xl" />
            <p className=" text-nowrap">Cards</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <AiOutlineShopping className="text-xl" />
            <p className=" text-nowrap">Items</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <FaCalendarAlt className="text-xl" />
            <p className=" text-nowrap">Calendar</p>
          </SidebarButton>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
