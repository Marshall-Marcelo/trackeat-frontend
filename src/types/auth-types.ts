export interface User {
  userId: string;
  email: string;
  username: string;
}

export interface LoginResponse {
  user: User;
  message: string;
}

export interface RegisterAccountDetails {
  email: string;
  password: string;
}

export interface LoginAccountDetails {
  nameCredential: string;
  password: string;
}

export interface RouterContext {
  isAuthenticated: boolean;
  user?: User;
}
