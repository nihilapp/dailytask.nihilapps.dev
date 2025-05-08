import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodosApi } from '@/_entities/todos/todos.api';
import { todosKeys } from '@/_entities/todos/todos.keys';
import type { CreateTodo } from '@/_entities/todos/todos.types';

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const {
    mutate: createTodo,
    isPending,
    isSuccess,
    ...other
  } = useMutation({
    mutationFn: (data: CreateTodo) => TodosApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: todosKeys.all(),
      });
    },
  });

  return {
    createTodo,
    isPending,
    isSuccess,
    ...other,
  };
}
