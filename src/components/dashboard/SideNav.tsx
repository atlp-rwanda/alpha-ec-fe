'use client';
import React from 'react';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { MdErrorOutline, MdOutlineManageAccounts } from 'react-icons/md';
import { FcStatistics } from 'react-icons/fc';
import { AiOutlineProduct } from 'react-icons/ai';
import { RiAccountCircleLine, RiLogoutBoxRLine } from 'react-icons/ri';
import { IoIosHelpCircleOutline } from 'react-icons/io';
import { IoCalendarNumberOutline } from 'react-icons/io5';
import { useRouter, usePathname } from 'next/navigation';
import { FaKey } from 'react-icons/fa';

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
            <MdOutlineManageAccounts className="text-2xl" />
            <p>Profile</p>
          </SidebarButton>
          <SidebarButton paths={['/update-password']}>
            <FaKey className="text-2xl" />
            <p>Privacy</p>
          </SidebarButton>
        </div>
        <div className="mt-6 ">
          <h2 className="text-xl font-semibold">Activities</h2>
          <SidebarButton paths={[]}>
            <FcStatistics className="text-xl" />
            <p className="text-nowrap">Statistics</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <MdErrorOutline className="text-xl" />
            <p className=" text-nowrap">Error</p>
          </SidebarButton>
          <SidebarButton paths={['/dashboard/add-items']}>
            <AiOutlineProduct className="text-xl" />
            <p className=" text-nowrap">Products</p>
          </SidebarButton>
        </div>
        <div>
          <h2 className="text-xl font-semibold">More Info</h2>
          <SidebarButton paths={['/dashboard/accountstatus']}>
            <RiAccountCircleLine className="text-xl" />
            <p className=" text-nowrap">Account Status</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <IoIosHelpCircleOutline className="text-xl" />
            <p className="text-nowrap">Help</p>
          </SidebarButton>
          <SidebarButton paths={[]}>
            <RiLogoutBoxRLine className="text-xl" />
            <p className="text-nowrap">Logout</p>
          </SidebarButton>
        </div>
      </nav>
    </div>
  );
};

export default SideNav;
