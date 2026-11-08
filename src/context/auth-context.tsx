import { createContext } from 'react';
import type { User } from '@/types/auth-types';
import { useGetCurrentUser } from '@/hooks/useRefresh';

interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  isRefreshingUser?: boolean;
  // login: (data: LoginResponse) => void;
  // logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: Props) {
  const { data: currentUser, isLoading: isRefreshingUser } =
    useGetCurrentUser();
  const user = currentUser ?? undefined;

  // const logout = () => {
  //   setUser(undefined);
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== undefined,
        isRefreshingUser: isRefreshingUser,
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
