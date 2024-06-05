'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { fetchUsers } from '@/redux/slices/fetchSlice';
import { RootState } from '@/redux/store';
import useToast from '@/components/alerts/Alerts';
import { ToastContainer } from 'react-toastify';
import Sidebar from '@/components/sidebar/sidebar';
import Pagination from '@/components/pagination/Pagination';
import SideNav from '@/components/dashboard/SideNav';

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
}

export default function AdminPanel() {
  const dispatch = useAppDispatch();

  const { users, loading, error } = useAppSelector(
    (state: RootState) => state.fetch
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {}, [currentPage, usersPerPage]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  const totalUsers = users?.data ? users.data.length : 0;

  const currentUsers = users?.data.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex h-auto min-h-screen w-full text-black bg-gray-50">
      <SideNav />
      <div className="flex flex-col w-4/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-3xl font-bold mt-2 mb-2">All Users</div>
          <div className="flex space-x-2 mt-2 mb-2">
            <button className="px-3 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
              Active
            </button>
            <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50">
              Inactive
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-2.5">
          {currentUsers?.map((user: any) => (
            <div
              key={user.id}
              className="bg-white shadow-lg rounded-lg p-3 flex items-center space-x-7" // Increased padding
            >
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 0H0v24h24V0z" fill="none" />
                  <path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-black truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
              <div>
                <div>
                  <p className="text-sm text-black">{user.gender}</p>
                </div>
                <p className="text-sm text-black">{user.address}</p>
              </div>
              <div>
                <p className="text-sm text-black">{user.phone}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={totalUsers}
            itemsPerPage={usersPerPage}
            onPageChange={paginate}
          />
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}
