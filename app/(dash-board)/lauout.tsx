import React from 'react';
import { DashBoardLayout } from '@/(dash-board)/_layouts';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children, }: Props) {
  return (
    <DashBoardLayout>
      {children}
    </DashBoardLayout>
  );
}
