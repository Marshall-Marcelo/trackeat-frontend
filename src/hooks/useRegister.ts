import { useMutation } from '@tanstack/react-query';
import { authService } from '@/service/auth';
import type { RegisterAccountDetails } from '@/types/auth-types';

export function useRegisterAccount() {
  return useMutation({
    mutationFn: ({ email, password }: RegisterAccountDetails) =>
      authService.register(email, password),
  });
}
