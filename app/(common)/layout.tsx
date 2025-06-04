import React from 'react';
import { CommonLayout } from './_layouts/CommonLayout';

interface Props {
  children: React.ReactNode;
}

export function Layout({ children, }: Props) {
  return (
    <CommonLayout>
      {children}
    </CommonLayout>
  );
}

export default Layout;
