import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from './lib/query-client';
import { Toaster } from 'sonner';
import type { User } from '@/types/auth-types';
import { AuthProvider } from '@/context/auth-context';
import { useAuth } from '@/hooks/useAuth';

export const router = createRouter({
  routeTree,
  context: { isAuthenticated: false, user: undefined },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface RouterContext {
    isAuthenticated: boolean;
    user?: User;
  }
}

function RoutedApplication() {
  const auth = useAuth();

  return (
    <RouterProvider
      router={router}
      context={{
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
      }}
    />
  );
}

const App = () => {
  return (
    <AuthProvider>
      <QueryProvider>
        <RoutedApplication />
        <Toaster duration={2 * 1000} />
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
