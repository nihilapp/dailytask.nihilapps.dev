'use client';

import React from 'react';
import { CommonHeader } from '@/(common)/_layouts/CommonHeader';
import { CommonContent } from '@/(common)/_layouts/CommonContent';
import { CommonFooter } from '@/(common)/_layouts/CommonFooter';

interface Props {
  children: React.ReactNode;
}

export function CommonLayout({ children, }: Props) {
  return (
    <>
      <CommonHeader />
      <CommonContent>
        {children}
      </CommonContent>
      <CommonFooter />
    </>
  );
}
