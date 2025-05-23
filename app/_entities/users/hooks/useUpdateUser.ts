import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UsersApi } from '@/_entities/users/users.api';
import type { UpdateUser } from '@/_entities/users';
import { userKeys } from '@/_entities/users';

interface UseUpdateUserParams {
  id: string;
  data: UpdateUser;
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const query = useMutation({
    mutationFn: ({ id, data, }: UseUpdateUserParams) => UsersApi.update(id, data),
    onSuccess: (res, postData) => {
      queryClient.invalidateQueries({
        queryKey: userKeys.list,
      });
      queryClient.invalidateQueries({
        queryKey: userKeys.detailId(postData.id),
      });
    },
  });

  return query;
}
