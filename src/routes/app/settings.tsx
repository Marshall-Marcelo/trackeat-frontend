import { createFileRoute } from '@tanstack/react-router';
import Settings from '@/features/app/Settings';

export const Route = createFileRoute('/app/settings')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Settings />;
}
