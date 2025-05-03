import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function MyPageLayout({ children, }: Props) {
  return (
    <div>{children}</div>
  );
}
