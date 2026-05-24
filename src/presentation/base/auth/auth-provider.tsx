import { useState } from 'react';
import { AuthContext } from './auth-context';
import { Storage } from '@application/base/contracts/storage';

type Props = {
  children: React.ReactNode;
  storage: Storage;
};

export function AuthProvider({ children, storage }: Props) {
  const [authenticated, setAuthenticated] = useState(
    !!storage.get('accessToken'),
  );

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
