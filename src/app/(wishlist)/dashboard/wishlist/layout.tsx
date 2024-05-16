import React from 'react';
import SideNav from '../../../../components/dashboard/SideNav';
import TopNav from '../../../../components/dashboard/TopNav';

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-full">
      <div className="hidden sm:flex md:flex lg:flex">
        <SideNav />
      </div>
      <div className="flex flex-col w-full">
        <TopNav />
        <main className="flex-1  sm:p-8 md:p-8 lg:p-8 p-2 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
