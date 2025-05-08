import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';

export function useDeleteTodo(id: string) {
  const queryClient = useQueryClient();

  const {
    mutate: deleteTodo,
    isPending,
    isSuccess,
    ...other
  } = useMutation({
    mutationFn: () => TodosApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.all(),
      });
    },
  });

  return {
    deleteTodo,
    isPending,
    isSuccess,
    ...other,
  };
}
