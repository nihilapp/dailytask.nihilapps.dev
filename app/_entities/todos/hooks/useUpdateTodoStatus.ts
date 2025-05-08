import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { UpdateTodoStatus } from '@/_entities/todos/todos.types';

export function useUpdateTodoStatus(id: string) {
  const queryClient = useQueryClient();

  const {
    mutate: updateTodoStatus,
    isPending,
    isSuccess,
    ...other
  } = useMutation({
    mutationFn: (data: UpdateTodoStatus) => TodosApi.updateStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.byId(id),
      });

      queryClient.invalidateQueries({
        queryKey: todosKeys.all(),
      });
    },
  });

  return {
    updateTodoStatus,
    isPending,
    isSuccess,
    ...other,
  };
}
