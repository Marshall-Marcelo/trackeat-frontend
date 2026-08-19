import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { QueryProvider } from './lib/query-client';
import { Toaster } from 'sonner';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }

  interface RouterContext {
    isAuthenticated: boolean;
    user?: any;
  }
}

const App = () => {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
      <Toaster duration={2 * 1000} />
    </QueryProvider>
  );
};

export default App;
