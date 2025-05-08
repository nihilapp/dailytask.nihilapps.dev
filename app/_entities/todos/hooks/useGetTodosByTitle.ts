import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useLoading, useDone } from '@/_entities/common';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { ExTodo } from '@/_entities/todos/todos.types';

export function useGetTodosByTitle(title: string, options?: UseQueryOptions<ApiResponse<ExTodo[]>>) {
  const {
    data: todos,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<ExTodo[]>>({
    queryKey: todosKeys.allByTitle(title),
    queryFn: () => TodosApi.getAllByTitle(title),
    enabled: !!title,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    todos: todos?.response || [],
    message: todos?.message || '',
    loading,
    done,
    ...other,
  };
}
