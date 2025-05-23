import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { UsersApi } from '../users.api';
import { userKeys } from '@/_entities/users';
import { useDone, useLoading } from '@/_entities/common';
import type { ApiResponse } from '@/_entities/common/common.types';
import type { User } from '@/_prisma/client';

export function useGetUsers(options?: UseQueryOptions<ApiResponse<User[]>>) {
  const {
    data: users,
    isLoading,
    isFetching,
    isSuccess,
    ...other
  } = useQuery<ApiResponse<User[]>>({
    queryKey: userKeys.list,
    queryFn: UsersApi.getAll,
    ...options,
  });

  const loading = useLoading(isLoading, isFetching);
  const done = useDone(loading, isSuccess);

  return {
    users: users?.response || [],
    message: users?.message || '',
    loading,
    done,
    ...other,
  };
}
