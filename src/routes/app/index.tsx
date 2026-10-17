import { createFileRoute } from '@tanstack/react-router';
import Dashboard from '@/features/app/Dashboard';

export const Route = createFileRoute('/app/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
