import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { TodosApi, todosKeys } from '@/_entities/todos';
import { useDone, useLoading } from '@/_entities/common';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { ExTodo } from '@/_entities/todos/todos.types';

export function useGetTodos(options?: UseQueryOptions<ApiResponse<ExTodo[]>>) {
  const {
    data: todos,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<ExTodo[]>>({
    queryKey: todosKeys.all(),
    queryFn: TodosApi.getAll,
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
