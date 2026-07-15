import { createFileRoute } from '@tanstack/react-router';
import LandingPage from '../features/public/LandingPage';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LandingPage />;
}
