import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';

export function useDeleteManyTodos() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteManyTodos,
    isPending,
    isSuccess,
    ...other
  } = useMutation({
    mutationFn: (ids: string[]) => TodosApi.deleteMany(ids),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.all(),
      });
    },
  });

  return {
    deleteManyTodos,
    isPending,
    isSuccess,
    ...other,
  };
}
