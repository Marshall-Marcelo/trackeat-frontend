import { RouterProvider } from '@tanstack/react-router';
import { QueryProvider } from './lib/query-client';
import { Toaster } from 'sonner';
import type { User } from '@/types/auth-types';
import { AuthProvider } from '@/context/auth-context';
import { useAuth } from '@/hooks/useAuth';
import { router } from '@/lib/utils/routerConfig';

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
    <QueryProvider>
      <AuthProvider>
        <RoutedApplication />
        <Toaster duration={2 * 1000} />
      </AuthProvider>
    </QueryProvider>
  );
};

export default App;
