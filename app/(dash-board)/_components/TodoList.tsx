'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn, tools } from '@/_libs';
import { useGetTodos } from '@/_entities/todos';
import { LoadingCircle } from '@/(common)/_components';

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

export function TodoList({ className, ...props }: Props) {
  const {
    todos,
    loading,
    done,
  } = useGetTodos();

  return (
    <div
      className={cn(
        cssVariants({}),
        className
      )}
      {...props}
    >
      {loading && (
        <LoadingCircle />
      )}

      {done && todos.length === 0 && (
        <div>할 일이 없습니다.</div>
      )}

      {done && todos.length > 0 && (
        <div>
          {todos.map((todo) => (
            <div key={todo.id}>{tools.common.string(todo)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
