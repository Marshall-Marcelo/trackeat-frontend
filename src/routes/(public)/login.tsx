import { createFileRoute } from '@tanstack/react-router';
import LoginPage from '../../features/public/LoginPage';

export const Route = createFileRoute('/(public)/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginPage />;
}
