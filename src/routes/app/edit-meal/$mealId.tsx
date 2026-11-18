import { createFileRoute } from '@tanstack/react-router';
import EditMeal from '@/features/app/tracker/pages/EditMeal';

export const Route = createFileRoute('/app/edit-meal/$mealId')({
  component: RouteComponent,
});

function RouteComponent() {
  return <EditMeal />;
}
