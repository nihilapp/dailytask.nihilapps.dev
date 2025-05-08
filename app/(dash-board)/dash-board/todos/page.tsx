import React from 'react';
import { setMeta } from '@/_libs';
import { TodoList } from '@/(dash-board)/_components';

interface Props {}

export const metadata = setMeta({
  title: `일정 관리`,
  url: `/dash-board/todos`,
});

export default function TodosListPage() {
  return (
    <TodoList />
  );
}
