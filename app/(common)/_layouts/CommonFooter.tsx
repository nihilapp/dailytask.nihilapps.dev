'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `py-6 px-6 mt-auto`,
    `bg-gray-50 border-t border-gray-100`,
    `text-center text-gray-500 text-sm`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonFooter({ className, ...props }: Props) {
  return (
    <footer
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='container mx-auto'>
        <p>&copy; {new Date().getFullYear()} DailyTask. 모든 권리 보유.</p>
      </div>
    </footer>
  );
}
