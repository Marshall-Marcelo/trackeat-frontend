import { useQuery } from '@tanstack/react-query';
import { authService } from '@/service/auth';
import { queryKeys } from '@/lib/utils/query-keys';

export function useGetCurrentUser() {
  return useQuery({
    queryKey: queryKeys.user.current(),
    queryFn: () => authService.refreshCurrentUserDetails(),
  });
}
