'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex flex-col md:flex-row`,
    `container mx-auto px-4 py-6`,
    `min-h-[calc(100vh-theme(spacing.16)-theme(spacing.16))]`,
    `gap-6`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonContent({ className, children, ...props }: Props) {
  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <aside className='order-2 md:order-1 w-full md:w-64 shrink-0 bg-white rounded-lg shadow-sm border border-gray-100 h-fit'>
        <div className='p-4'>
          <h2 className='font-bold text-lg text-gray-800 mb-4'>메뉴</h2>
          <nav>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/dash-board'
                  className='flex items-center gap-2 px-3 py-2 w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-blue-200 hover:shadow-sm'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                  </svg>
                  대시보드
                </Link>
              </li>
              <li>
                <Link
                  href='/dash-board/todos'
                  className='flex items-center gap-2 px-3 py-2 w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-blue-200 hover:shadow-sm'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' />
                  </svg>
                  할 일 목록
                </Link>
              </li>
              <li>
                <Link
                  href='/dash-board/projects'
                  className='flex items-center gap-2 px-3 py-2 w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-blue-200 hover:shadow-sm'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' />
                  </svg>
                  프로젝트
                </Link>
              </li>
              <li>
                <Link
                  href='/dash-board/settings'
                  className='flex items-center gap-2 px-3 py-2 w-full text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 font-medium border border-transparent hover:border-blue-200 hover:shadow-sm'
                >
                  <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>
                  설정
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
      <main className='order-1 md:order-2 flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-6'>
        {children}
      </main>
    </div>
  );
}
