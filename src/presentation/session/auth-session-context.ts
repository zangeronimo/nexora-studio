import { AuthSession } from '@domain/entities/core/auth-session';
import { createContext } from 'react';

export type AuthSessionContextValue = {
  session: AuthSession | null;
  loading: boolean;
};

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(
  null,
);
