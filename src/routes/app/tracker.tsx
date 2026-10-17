import { createFileRoute } from '@tanstack/react-router';
import Tracker from '@/features/app/Tracker';

export const Route = createFileRoute('/app/tracker')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Tracker />;
}
