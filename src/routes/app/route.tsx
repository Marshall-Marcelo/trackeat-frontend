import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import AppLayout from '@/layouts/AppLayout';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}
