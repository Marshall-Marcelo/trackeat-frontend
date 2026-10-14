import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import ResponsiveLayout from '../../layouts/ResponsiveLayout';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
  beforeLoad: ({ context }) => {
    console.log('Router Context', context);
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' });
    }
  },
});

function RouteComponent() {
  return (
    <ResponsiveLayout>
      <Outlet />
    </ResponsiveLayout>
  );
}
