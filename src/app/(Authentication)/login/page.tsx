'use client';

import React, { useEffect } from 'react';
import _ from 'lodash';
import { Button, ButtonStyle, Input } from '@/components/formElements';
import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { logInFields } from '@/utils/logInFormFields';
import {
  regExPatterns,
  FormErrorInterface,
  ErrorInterface,
  getErrorForField
} from '@/utils';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAppDispatch } from '@/redux/hooks/hook';
import useToast from '@/components/alerts/Alerts';
import { ToastContainer } from 'react-toastify';
import Google from '@/assets/images/Google.png';
import Image from 'next/image';

export interface FormDataInterface {
  email: string;
  password: string;
}

export type logInKeys = keyof FormDataInterface;

const InitialFormValues: FormDataInterface = {
  email: '',
  password: ''
};

export default function Home() {
  const router = useRouter();
  const { logInUser } = useAppDispatch();

  const { showSuccess, showError } = useToast();

  const { loading, success, error, data } = useSelector(
    (state: RootState) => state.login
  );

  const [formData, setFormData] =
    useState<FormDataInterface>(InitialFormValues);
  const [errors, setErrors] = useState<ErrorInterface[]>([]);

  const handleChange = (key: logInKeys, value: string) => {
    setErrors([]);
    setFormData(prevFormData => {
      const updatedFormData = { ...prevFormData, [key]: value };
      return updatedFormData;
    });
  };

  const handleGoogleAuth = () => {
    router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/users/google-auth`);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);
    const newErrors: ErrorInterface[] = [];

    if (!regExPatterns.email.test(formData.email)) {
      newErrors.push({ target: 'email', msg: 'please enter a valid email' });
    }
    if (!regExPatterns.password.test(formData.password)) {
      newErrors.push({
        target: 'password',
        msg: 'please enter a valid password'
      });
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }
    const result = await logInUser(formData);

    if (success) {
      // if (data?.message === 'Verify OTP sent to your email to continue') {
      //   router.push('/sellerAuth');
      //   showSuccess('Login Successful!');
      //   setTimeout(() => {
      //     router.push('/');
      //   }, 2000);
      // }
      if (data?.message === 'Verify OTP sent to your email to continue') {
        router.push('/sellerAuth');
      } else {
        showSuccess('Login Successful!');
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } else if (error) {
      const errorMessage = data?.message || 'An error occurred';

      if (errorMessage === 'Validation Errors!') {
        const newErrors: ErrorInterface[] = [];
        error?.data.forEach((err: { field: string; message: string }) => {
          newErrors.push({
            target: err.field as keyof FormDataInterface,
            msg: err.message
          });
        });
        setErrors(newErrors);
      }
      showError(errorMessage || `login Failed!`);
    }
  };

  return (
    <>
      <div className="w-2/3 mx-auto flex flex-col align-middle animate__animated animate__backInLeft ">
        <div className="flex font-extrabold text-main-400 text-4xl mb-4 mx-auto">
          {' '}
          Login{' '}
        </div>
        <form
          className="flex flex-col align-middle"
          onSubmit={e => handleSubmit(e)}
        >
          {logInFields.map((field, i) => (
            <div
              className="w-full mt-2 flex flex-col gap-1 animate__animated animate__fadeInDown"
              key={i}
            >
              <Input
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={formData[field.key]}
                onChange={(e: { target: { value: any } }) =>
                  handleChange(field.key, e.target.value)
                }
                valid={getErrorForField(errors, field.key) ? false : true}
              />
              {getErrorForField(errors, field.key) && (
                <span className="text-xs text-red-600 px-2 animate__animated animate__fadeInDown">
                  {getErrorForField(errors, field.key)}
                </span>
              )}
            </div>
          ))}
          <Button
            label="login"
            style={ButtonStyle.DARK}
            disabled={loading}
            loading={loading}
          />
        </form>
        <div className="flex items-center justify-center space-x-0">
          <span className="text-main-300 font-bold">or login with</span>
          <button onClick={handleGoogleAuth} className="rounded-md">
            <Image src={Google} alt="google image" />
          </button>
        </div>

        <span className="mt-6 mx-auto text-sm text-black">
          Or create an account?{' '}
          <Link
            href="/register"
            className="text-main-400 font-bold hover:underline hover:font-extrabold"
          >
            register
          </Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
}
