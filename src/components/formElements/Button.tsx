import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  label: string;
  disabled: boolean;
  loading: boolean;
  style: ButtonStyle;
}

export enum ButtonStyle {
  LIGHT = 'light',
  DARK = 'dark'
}

export const Button = ({ loading, label, style, ...rest }: ButtonProps) => {
  return (
    <div className="relative w-full">
      <button
        type={'submit'}
        {...rest}
        className={`rounded-full max-w-full min-w-52 md:w-max justify-center p-3 text-base hover:bg-main-300 hover:shadow-md flex items-center gap-2 cursor-pointer  lg:mt-8 mx-auto  ${
          style === ButtonStyle.LIGHT
            ? 'border-1 border-main-400  font-medium text-main-400 bg-main-100 bg-transparent'
            : style === ButtonStyle.DARK
              ? 'bg-main-400 text-main-100 font-medium'
              : loading
                ? 'animate-ping'
                : ''
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2 px-16">
            <AiOutlineLoading3Quarters className="text-base text-main-100 animate-spin" />
            Please wait...
          </span>
        ) : (
          <span className="">{label}</span>
        )}
      </button>
    </div>
  );
};
