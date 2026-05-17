import { LoginRequest } from '@application/requests/use-cases/login-request';
import { createContext } from 'react';

export type AuthContextValue = {
  authenticated: boolean;
  login: (input: LoginRequest) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);
