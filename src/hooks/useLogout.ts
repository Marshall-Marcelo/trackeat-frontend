import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { authService } from '@/service/auth';
import { toast } from 'sonner';

export function useLogoutAccount() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (data) => {
      queryClient.clear();
      navigate({ to: '/login' });
      window.location.reload();
      toast(data.message);
    },
  });
}
