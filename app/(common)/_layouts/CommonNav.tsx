'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/_libs';
import { useAuthActions, useUserSession } from '@/_entities/auth';

interface Props
  extends React.HTMLAttributes<HTMLElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    `flex items-center`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

export function CommonNav({ className, ...props }: Props) {
  const userSession = useUserSession();
  const { setUserSession, setSignInCallBackUrl, } = useAuthActions();
  const pathname = usePathname();

  const onClickSignOut = () => {
    setUserSession(null);
  };

  const onClickSignIn = () => {
    // 현재 페이지 경로를 저장 (로그인 페이지와 회원가입 페이지는 제외)
    if (pathname !== '/auth/signin' && pathname !== '/auth/signup') {
      setSignInCallBackUrl(pathname);
    }
  };

  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul className='flex items-center gap-6'>
        <li>
          <Link
            href='/'
            className='px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm border border-gray-100 hover:border-blue-500'
          >
            <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' />
            </svg>
            홈
          </Link>
        </li>
        {userSession ? (
          <>
            <li>
              <Link
                href='/dash-board'
                className='px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm border border-gray-100 hover:border-blue-500'
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' />
                </svg>
                대시보드
              </Link>
            </li>
            <li>
              <button
                onClick={onClickSignOut}
                className='px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-red-600 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm border border-gray-100 hover:border-red-500'
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                </svg>
                로그아웃
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link
              href='/auth/signin'
              onClick={onClickSignIn}
              className='px-3 py-2 rounded-md text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-200 font-medium flex items-center gap-2 shadow-sm border border-gray-100 hover:border-blue-500'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1' />
              </svg>
              로그인
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
