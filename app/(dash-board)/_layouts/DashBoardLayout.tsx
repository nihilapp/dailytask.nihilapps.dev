'use client';

import React from 'react';
import { DashBoardNav } from '@/(dash-board)/_components';

interface Props {
  children: React.ReactNode;
}

export function DashBoardLayout({ children, }: Props) {
  return (
    <>
      <header>header</header>
      <div>
        <aside>
          <DashBoardNav />
        </aside>
        <main>{children}</main>
      </div>
      <footer>footer</footer>
    </>
  );
}
