import React from 'react';
import type { Metadata } from 'next';
import { SlUserFollow } from 'react-icons/sl';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Auth'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-screen flex items-center overflow-hidden fixed">
      <div className="xs:w-full md:w-1/2 h-full angled-right flex flex-col items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex lg:flex md:w-1/2 h-full bg-main-300 angled-left items-center justify-center"></div>
      <div className="hidden md:w-1/2 h-2/3 z-50 absolute right-0 top-1/3 text-main-100 md:flex justify-center animate__animated animate__fadeIn">
        <SlUserFollow size={400} />
      </div>
    </div>
  );
}
