'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '@/_libs';
import { Logo } from '@/(common)/_layouts/Logo';
import { CommonNav } from '@/(common)/_layouts/CommonNav';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex items-center justify-between px-6 py-4`,
    `bg-white shadow-sm border-b border-gray-100`,
    `sticky top-0 z-10`,
    `transition-all duration-200 ease-in-out`,
  ],
  {
    variants: {
      size: {
        default: 'h-16',
        compact: 'h-14',
      },
    },
    defaultVariants: {
      size: 'default',
    },
    compoundVariants: [],
  }
);

export function CommonHeader({ className, ...props }: Props) {
  return (
    <header
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <Logo />
      <CommonNav />
    </header>
  );
}
