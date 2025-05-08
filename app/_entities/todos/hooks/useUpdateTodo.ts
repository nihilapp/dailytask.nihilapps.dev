import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { UpdateTodo } from '@/_entities/todos/todos.types';

export function useUpdateTodo(id: string) {
  const queryClient = useQueryClient();

  const {
    mutate: updateTodo,
    isPending,
    isSuccess,
    ...other
  } = useMutation({
    mutationFn: (data: UpdateTodo) => TodosApi.update(id, data),
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
    updateTodo,
    isPending,
    isSuccess,
    ...other,
  };
}
