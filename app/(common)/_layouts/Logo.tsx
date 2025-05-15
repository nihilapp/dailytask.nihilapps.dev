'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLAnchorElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
  href?: string;
}

const cssVariants = cva(
  [
    `flex items-center gap-1`,
    `font-bold text-xl transition-all duration-200`,
    `hover:opacity-90 hover:scale-105`,
    `py-1 px-2 rounded-md`,
  ],
  {
    variants: {
      size: {
        default: 'text-xl',
        small: 'text-lg',
        large: 'text-2xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
    compoundVariants: [],
  }
);

export function Logo({
  href = '/',
  className,
  ...props
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <div className='flex items-center gap-1 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text'>
        <span className='text-transparent font-black'>Daily</span>
        <span className='text-gray-800 font-bold'>Task</span>
        <span className='ml-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-md font-semibold'>Beta</span>
      </div>
    </Link>
  );
}
