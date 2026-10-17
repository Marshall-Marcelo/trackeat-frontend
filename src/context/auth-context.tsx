import { createContext, useState } from 'react';
import type { User, LoginResponse } from '@/types/auth-types';
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

  // console.log('Auth Context', user);
  // const [user, setUser] = useState<User | undefined>(undefined);

  // const login = (data: LoginResponse) => {
  //   setUser(data.user);
  //   console.log(data);
  // };

  // const logout = () => {
  //   setUser(undefined);
  // };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== undefined,
        isRefreshingUser: isRefreshingUser,
        // login,
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
