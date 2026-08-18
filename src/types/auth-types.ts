export interface User {
  userId: string;
  email: string;
  userName: string;
}

export interface AccessTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

export interface LoginResponse {
  user: User;
  tokens: AccessTokens;
}
