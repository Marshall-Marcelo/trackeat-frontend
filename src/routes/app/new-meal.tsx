import { createFileRoute } from '@tanstack/react-router';
import MealInput from '@/features/app/tracker/pages/MealInput';

export const Route = createFileRoute('/app/new-meal')({
  component: RouteComponent,
});

function RouteComponent() {
  return <MealInput />;
}
