import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function ProjectsLayout({ children, }: Props) {
  return (
    <div>{children}</div>
  );
}
