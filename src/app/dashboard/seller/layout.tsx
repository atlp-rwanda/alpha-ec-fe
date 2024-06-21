'use client';

import SideNav from '@/components/dashboard/seller/SideNav';
import TopNav from '@/components/dashboard/seller/TopNav';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-shrink-0">
      <div className="hidden sm:block">
        <SideNav />
      </div>
      <div className="flex flex-col w-full bg-white">
        <TopNav />
        <main className="flex-1  p-2 sm:p-8 bg-white overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
