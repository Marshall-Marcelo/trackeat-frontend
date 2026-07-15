import { createFileRoute, Outlet } from '@tanstack/react-router';
import ResponsiveLayout from '../../layouts/ResponsiveLayout';

export const Route = createFileRoute('/app')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ResponsiveLayout>
      <Outlet />
    </ResponsiveLayout>
  );
}
