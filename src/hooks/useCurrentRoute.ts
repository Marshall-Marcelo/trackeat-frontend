import { useRouterState } from '@tanstack/react-router';

export function useCurrentRoute() {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return currentPath;
}
