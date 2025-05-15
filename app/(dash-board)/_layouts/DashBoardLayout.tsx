'use client';

import React from 'react';
import { DashBoardNav } from '@/(dash-board)/_components';
import { CommonHeader, CommonFooter } from '@/(common)/_layouts';

interface Props {
  children: React.ReactNode;
}

export function DashBoardLayout({ children, }: Props) {
  console.log('내용');

  return (
    <>
      <CommonHeader />
      <div>
        <aside>
          <DashBoardNav />
        </aside>
        <main>{children}</main>
      </div>
      <CommonFooter />
    </>
  );
}
