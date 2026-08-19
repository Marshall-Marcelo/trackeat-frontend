import { ApiService } from './api';
import type { LoginResponse } from '../types/auth-types';
import type { MessageResponse } from '@/types/response';

class AuthService extends ApiService {
  async login(
    nameCredential: string,
    password: string,
  ): Promise<LoginResponse> {
    const data: LoginResponse = await this.handleFetch(`/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ nameCredential, password }),
    });

    return data;
  }

  async register(email: string, password: string): Promise<MessageResponse> {
    const data: MessageResponse = await this.handleFetch(`/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    return data;
  }
}

export const authService = new AuthService();
