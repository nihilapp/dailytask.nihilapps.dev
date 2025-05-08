'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import Link from 'next/link';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { IoFileTrayStacked } from 'react-icons/io5';
import { cn, tools } from '@/_libs';

interface Props
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof cssVariants> {
  className?: string;
}

const cssVariants = cva(
  [
    ``,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  }
);

const menuItems = [
  {
    icon: <MdOutlineCalendarToday />,
    href: '/dash-board/todos',
    label: '일정 관리',
  },
  {
    icon: <IoFileTrayStacked />,
    href: '/dash-board/projects',
    label: '프로젝트 관리',
  },
];

export function DashBoardNav({ className, ...props }: Props) {
  return (
    <nav
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      <ul>
        {menuItems.map((item) => (
          <li key={tools.common.uuid()}>
            <Link href={item.href}>
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
