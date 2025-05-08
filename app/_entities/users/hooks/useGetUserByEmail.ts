import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { userKeys } from '@/_entities/users';
import { UsersApi } from '@/_entities/users/users.api';
import { useDone, useLoading } from '@/_entities/common';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { User } from '@/_prisma/client';

export function useGetUserByEmail(email: string, options?: UseQueryOptions<ApiResponse<User>>) {
  const {
    data: user,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<User>>({
    queryKey: userKeys.detailEmail(email),
    queryFn: () => UsersApi.getByEmail(email),
    enabled: !!email,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    user: user?.response,
    message: user?.message || '',
    loading,
    done,
    ...other,
  };
}
