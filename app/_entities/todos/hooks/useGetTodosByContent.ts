import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useLoading, useDone } from '@/_entities/common';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { ExTodo } from '@/_entities/todos/todos.types';

export function useGetTodosByContent(content: string, options?: UseQueryOptions<ApiResponse<ExTodo[]>>) {
  const {
    data: todos,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<ExTodo[]>>({
    queryKey: todosKeys.allByContent(content),
    queryFn: () => TodosApi.getAllByContent(content),
    enabled: !!content,
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
