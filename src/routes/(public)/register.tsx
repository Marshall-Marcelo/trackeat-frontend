import { createFileRoute } from '@tanstack/react-router';
import RegisterPage from '../../features/public/RegisterPage';

export const Route = createFileRoute('/(public)/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterPage />;
}
