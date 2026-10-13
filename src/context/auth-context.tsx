import { createContext, useState } from 'react';
import type { User, LoginResponse } from '@/types/auth-types';

interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  login: (data: LoginResponse) => void;
  logout: () => void;
}

type Props = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (data: LoginResponse) => {
    setUser(data.user);
    console.log(data);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== undefined,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
