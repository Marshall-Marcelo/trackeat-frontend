import { useMutation } from '@tanstack/react-query';
import { authService } from '@/service/auth';
import type { LoginAccountDetails } from '@/types/auth-types';

export function useLoginAccount() {
  return useMutation({
    mutationFn: ({ nameCredential, password }: LoginAccountDetails) =>
      authService.login(nameCredential, password),
  });
}
