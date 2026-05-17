import { useState } from 'react';
import { AuthContext } from './auth-context';
import { Storage } from '@application/contracts/storage';
import { LoginRequest } from '@application/requests/use-cases/login-request';
import { AuthService } from '@application/contracts/auth-service';

type Props = {
  children: React.ReactNode;
  storage: Storage;
  authService: AuthService;
};

export function AuthProvider({ children, storage, authService }: Props) {
  const [authenticated, setAuthenticated] = useState(
    !!storage.get('accessToken'),
  );

  const logout = () => {
    storage.remove('accessToken');
    setAuthenticated(false);
  };

  const login = async (input: LoginRequest) => {
    const token = await authService.login(input);
    if (!token) {
      logout();
      return;
    }
    storage.set('accessToken', token);
    setAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
