'use client';
import React, { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  assignRole,
  updateUserId,
  updateRoleId,
  clearAssignRoleState
} from '@/redux/slices/assignroleSlice';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks/hook';
import useToast from '@/components/alerts/Alerts';
import { ToastContainer } from 'react-toastify';
import { Button, ButtonStyle } from '@/components/formElements';
import { AssignRoleFields, RoleKeys } from '@/utils/assingRoleFormField';
import SideNav from '@/components/dashboard/SideNav';

const AssignRoleForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { showSuccess, showError } = useToast();
  const { loading, userId, roleId } = useSelector(
    (state: RootState) => state.assignRole
  );

  useEffect(() => {
    return () => {
      dispatch(clearAssignRoleState());
    };
  }, [dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (userId && roleId) {
      const result = await dispatch(assignRole({ userId, roleId }));
      if (assignRole.fulfilled.match(result)) {
        showSuccess('Role assigned successfully!');
        dispatch(updateUserId(''));
        dispatch(updateRoleId(''));
      } else if (assignRole.rejected.match(result) && result.payload) {
        const errorMessage =
          (result.payload as any).message || 'An error occurred';
        showError(errorMessage || 'Assignment failed!');
      }
    } else {
      showError('Please fill out both User ID and Role ID.');
    }
  };

  return (
    <div className="flex h-auto min-h-screen w-full text-black bg-gray-50">
      <SideNav />
      <div className="max-w-md mx-auto mt-10 p-6 bg-[#e3f2f1] shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-[rgb(72,101,94)]">
          Assign role
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {AssignRoleFields.map(field => (
            <div key={field.key}>
              <label htmlFor={field.key} className="sr-only">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.key}
                value={(field.key === RoleKeys.UserId ? userId : roleId) || ''}
                placeholder={field.placeholder}
                onChange={e => {
                  if (field.key === RoleKeys.UserId) {
                    dispatch(updateUserId(e.target.value));
                  } else if (field.key === RoleKeys.RoleId) {
                    dispatch(updateRoleId(e.target.value));
                  }
                }}
                className="w-full p-2 border-b-2 border-gray-300 bg-transparent text-[#48655e] focus focus:border-[#48655e]"
                required
              />
            </div>
          ))}
          <Button
            label="Confirm"
            style={ButtonStyle.DARK}
            disabled={loading}
            loading={loading}
          />
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AssignRoleForm;
