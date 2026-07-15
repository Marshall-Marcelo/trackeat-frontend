import React from 'react';
import { cn } from '../lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const Button = ({ children, isLoading, className, ...props }: ButtonProps) => {
  return (
    <button
      disabled={isLoading}
      className={cn(
        'outline-1 px-2 py-1 w-full rounded hover:cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
