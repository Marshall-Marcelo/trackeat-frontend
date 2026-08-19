import React from 'react';
// import Button from '@/components/Button';
// import { cn } from '../lib/utils/cn';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelValue: string;
  name: string;
  isLoading?: boolean;
}
export const FormInput = ({
  name,
  labelValue,
  isLoading,
  ...props
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm" htmlFor={name}>
        {labelValue}
      </label>
      <input
        className="border px-2 py-1 rounded focus:outline-none"
        disabled={isLoading}
        id={name}
        name={name}
        {...props}
      />
    </div>
  );
};

export const Input = () => {
  return <input type="text" />;
};
