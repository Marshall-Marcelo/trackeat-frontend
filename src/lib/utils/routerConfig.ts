import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';
import type { User } from '@/types/auth-types';

export const router = createRouter({
  routeTree,
  context: { isAuthenticated: false, user: undefined },
});

export const updateRouterContext = (isAuthenticated: boolean, user: User) => {
  router.update({
    context: {
      isAuthenticated,
      user,
    },
  });
};
