import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useLoading, useDone } from '@/_entities/common';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { ExTodo } from '@/_entities/todos/todos.types';

export function useGetTodoById(id: string, options?: UseQueryOptions<ApiResponse<ExTodo>>) {
  const {
    data: todo,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<ExTodo>>({
    queryKey: todosKeys.byId(id),
    queryFn: () => TodosApi.getById(id),
    enabled: !!id,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    todo: todo?.response,
    message: todo?.message || '',
    loading,
    done,
    ...other,
  };
}
