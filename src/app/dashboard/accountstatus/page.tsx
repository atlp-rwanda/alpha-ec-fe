'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hook';
import { fetchAllUsers, disableAccount } from '@/redux/slices/disableaccount';
import Image from 'next/image';
import unKnownImage from '@/assets/images/unknown.png';
import ReasonModal from './ReasonModal';
import ToggleSwitch from './ToggleSwitch';
import useToast from '@/components/alerts/Alerts';
import { ToastContainer } from 'react-toastify';
import { Router } from 'next/router';

interface EmptyDataType {
  message: string;
}

const EmptyData: React.FC<EmptyDataType> = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-main-200 rounded-lg shadow-lg p-6 text-center">
        <p className="text-black text-lg">{message}</p>
      </div>
    </div>
  );
};
const AccountStatus: React.FC = () => {
  const dispatch = useAppDispatch();
  const [toggles, setToggles] = useState<{ [key: string]: boolean }>({});
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const { users, loading, error } = useAppSelector(state => state.users);
  const { message, success } = useAppSelector(state => state.users);
  const [showModal, setShowModal] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users?.data) {
      const initialToggles = users.data.reduce(
        (acc: { [key: string]: boolean }, user: any) => {
          acc[user.id] = user.status === false;
          return acc;
        },
        {}
      );
      setToggles(initialToggles);
    }
  }, [users]);

  useEffect(() => {
    if (success && message === 'Status has been updated to SUSPENDED') {
      const updatedToggles = { ...toggles };
      Object.keys(updatedToggles).forEach(userId => {
        if (users?.data.find(user => user.id === userId)?.status === false) {
          updatedToggles[userId] = true;
        }
      });
      setToggles(updatedToggles);
    }
  }, [message, success, toggles, users]);

  const handleToggleChange = async (userId: string) => {
    if (!toggles[userId]) {
      setCurrentUserId(userId);
      setShowModal(true);
    } else {
      const previousState = toggles[userId];
      setToggles(prevToggles => ({
        ...prevToggles,
        [userId]: !prevToggles[userId]
      }));
      const result = await handleDisableAccount(userId, '');
      if (!result) {
        setToggles(prevToggles => ({
          ...prevToggles,
          [userId]: previousState
        }));
      }
    }
  };
  const handleDisableAccount = async (userId: string, reason: string) => {
    try {
      const reasons = [reason];
      const result = await dispatch(disableAccount({ userId, reasons }));
      const showMessage = (result.payload as any).message;
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess(showMessage);
        return result;
      } else if (result.meta.requestStatus === 'rejected') {
        showError(showMessage);
      }
    } catch (error) {
      return null;
    }
  };

  const handleConfirmReason = (reason: string) => {
    if (currentUserId) {
      setToggles(prevToggles => ({
        ...prevToggles,
        [currentUserId]: !prevToggles[currentUserId]
      }));
      handleDisableAccount(currentUserId, reason);
    }
    setCurrentUserId(null);
  };

  const handleFilterChange = (filter: 'all' | 'active' | 'inactive') => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const filteredUsers = users?.data.filter((user: any) => {
    if (filter === 'active') return user.status === true;
    if (filter === 'inactive') return user.status === false;
    if (filter === 'all') return true;
    return true;
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = () => {
    if (filteredUsers) {
      return Math.ceil(filteredUsers?.length / usersPerPage);
    }
  };

  const totalpage = totalPages();

  const activeCount =
    users?.data.filter((user: any) => user.status === true).length || 0;
  const inactiveCount =
    users?.data.filter((user: any) => user.status === false).length || 0;
  const allUsers = users?.data.length;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const goToPreviousPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  return (
    <>
      <div className="sm:w-4/6 w-full sm:p-0  p-3 h-[100%] sm:h-4/6 ">
        <div className="flex flex-col justify-start sm:flex-row sm:gap-3 mt-4 sm:items-baseline items-center text-xs sm:text-lg">
          <button
            onClick={() => handleFilterChange('all')}
            className={`p-3 ${filter === 'all' ? 'border border-main-200' : 'border border-main-200'} text-black rounded h-fit w-fit flex gap-1 active:opacity-10 mb-4`}
          >
            <span className="bg-main-200 text-black text-sm px-2 py-0.5 font-extrabold">
              {allUsers}
            </span>
            <span>all</span>
          </button>
          <button
            onClick={() => handleFilterChange('active')}
            className={`p-3 ${filter === 'active' ? 'bg-main-200' : 'bg-main-200'} text-black rounded h-fit w-fit flex gap-1 active:opacity-10 sm:mb-0 mb-4`}
          >
            <span className="bg-main-300 text-white text-sm px-2 py-0.5">
              {activeCount}
            </span>
            <span>Active</span>
          </button>
          <button
            onClick={() => handleFilterChange('inactive')}
            className={`p-3 ${filter === 'inactive' ? 'border border-main-200' : 'border border-main-200'} text-black rounded sm:h-fit sm:w-fit  flex gap-1 active:opacity-10`}
          >
            <span className="bg-main-200 text-black text-sm px-2 py-0.5 font-extrabold">
              {inactiveCount}
            </span>
            <span>Inactive</span>
          </button>
        </div>
        <div className="min-h-[460px]">
          <div className="hidden sm:flex sm: flex-wrap justify-between p-5  text-black bg-white rounded-lg font-medium">
            <p className="w-1/12 text-left">Picture</p>
            <p className="w-3/12 text-left">Name/Email</p>
            <p className="w-2/12 text-left">Gender</p>
            <p className="w-2/12 text-left">Date of Birth</p>
            <p className="w-2/12 text-left">Status</p>
          </div>
          {currentUsers?.map((user: any) => (
            <div
              key={user.id}
              className="sm:flex sm:justify-between sm:flex-wrap sm:text-lg text-xs items-center p-2 sm:p-5 bg-white my-2 rounded-lg text-main-300 font-medium"
            >
              <div className="w-full sm:w-1/12 flex justify-center sm:justify-start items-center mb-3 sm:mb-0">
                <Image
                  src={user.photoUrl || unKnownImage}
                  alt={user.name}
                  width={40}
                  height={40}
                  className="rounded-full w-10 h-10 m-auto"
                />
              </div>
              <div className="sm:w-3/12 w-12/12 sm:text-left text-center mb-3 sm:mb-0">
                <p className="mb-3 sm:mb-0">{user.name}</p>
                <p className="text-black font-normal text-sm">{user.email}</p>
              </div>
              <p className="sm:w-2/12 sm:text-left w-12/12 text-center mb-3 sm:mb-0">
                {user.gender || 'Missing'}
              </p>
              <p className="sm:w-2/12 sm:text-left w-12/12 text-center">
                {user.birthdate || 'Missing'}
              </p>
              <div className="sm:w-2/12 w-full flex justify-center sm:justify-start items-center mt-2 sm:mt-0">
                <ToggleSwitch
                  onChange={() => handleToggleChange(user.id)}
                  value={toggles[user.id]}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center my-3 inset-x-0 ">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-3 text-black py-0.5 mx-1 border border-main-200 bg-white"
          >
            {'<'}
          </button>
          {Array.from({ length: totalpage || 0 }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`hidden sm:block px-3 text-black py-0.5 mx-1 border border-main-200 bottom-0 ${
                currentPage === index + 1 ? 'bg-main-200' : 'bg-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalpage}
            className="px-3 text-black py-0.5 mx-1 border border-main-200 bg-white"
          >
            {'>'}
          </button>
        </div>
      </div>
      {showModal && (
        <ReasonModal
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmReason}
        />
      )}
      <ToastContainer />
    </>
  );
};

export default AccountStatus;
