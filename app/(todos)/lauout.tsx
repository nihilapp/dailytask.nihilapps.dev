import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function TodosLayout({ children, }: Props) {
  return (
    <div>{children}</div>
  );
}
