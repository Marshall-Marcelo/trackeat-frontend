import React from 'react';
import { cn } from '../lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, className, disabled, ...props }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cn(
        'outline-1 px-2 py-1 w-full rounded flex justify-center hover:cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
