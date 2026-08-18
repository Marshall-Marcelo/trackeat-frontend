import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useRegisterAccount(email: string, password: string) {
  const queryClient = useQueryClient();
}
