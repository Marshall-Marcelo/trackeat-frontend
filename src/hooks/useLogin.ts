import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/service/auth';
import type { LoginAccountDetails } from '@/types/auth-types';
import { queryKeys } from '@/lib/utils/query-keys';

export function useLoginAccount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ nameCredential, password }: LoginAccountDetails) =>
      authService.login(nameCredential, password),
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.user.current(), data.user);
    },
  });
}
