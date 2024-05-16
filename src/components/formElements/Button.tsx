import React from 'react';
import { IconType } from 'react-icons';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface ButtonProps {
  label: string;
  disabled: boolean;
  loading: boolean;
  style: ButtonStyle;
  size?: ButtonSize;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

export enum ButtonSize {
  SMALL = 'SMALL',
  MID = 'MID',
  MAX = 'MAX'
}

export enum ButtonStyle {
  LIGHT = 'light',
  DARK = 'dark',
  DISABLED = 'DISABLED',
  DELETE = 'DELETE',
  Primary = 'Primary'
}

export const Button = ({
  loading,
  label,
  style,
  size,
  icon,
  onClick,
  className,
  ...rest
}: ButtonProps) => {
  return (
    // <div className="relative w-full">
    <button
      type={'submit'}
      {...rest}
      className={`rounded-full max-w-full min-w-52 md:w-max justify-center ${size === ButtonSize.SMALL ? 'px-2 py-1 text-sm' : 'px-3 py-2 text-md'} text-sm hover:bg-main-300 hover:shadow-md flex items-center gap-2 cursor-pointer  lg:mt-8 mx-auto  ${
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
        <span className="flex items-center justify-center gap-2">
          <AiOutlineLoading3Quarters className="text-base text-main-100 animate-spin" />
          Loading...
        </span>
      ) : (
        <span className=" flex gap-1 items-center">
          {icon && React.createElement(icon, { size: 20 })}
          {label}
        </span>
      )}
    </button>
    // </div>
  );
};
