import { createFileRoute } from '@tanstack/react-router';
import Tracker from '@/features/app/tracker/pages/Tracker';

export const Route = createFileRoute('/app/tracker')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Tracker />;
}
