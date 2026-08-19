import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '@/service/auth';
import type { MessageResponse } from '@/types/response';

export function useRegisterAccount() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authService.register(email, password),
    onSuccess: () => {
      toast.success('Account creation success');
    },
    onError: (error: MessageResponse) => {
      let errorMessage = 'Failed to create account';

      if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    },
  });
}
