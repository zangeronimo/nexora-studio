import { useEffect, useState } from 'react';
import { AuthSessionContext } from './auth-session-context';
import { AuthSession } from '@domain/entities/auth-session';
import { UserProfileService } from '@application/contracts/core/user-profile-service';
import { useAuth } from '@presentation/auth/use-auth';

type Props = {
  children: React.ReactNode;
  service: UserProfileService;
};

export function AuthSessionProvider({ children, service }: Props) {
  const { authenticated, setAuthenticated } = useAuth();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(authenticated);

  useEffect(() => {
    if (!authenticated) {
      setSession(null);
      return;
    }

    setLoading(true);
    service
      .get()
      .then((result) => {
        setSession(result);
      })
      .catch(() => {
        setSession(null);
        setAuthenticated(false);
      })
      .finally(() => setLoading(false));
  }, [authenticated]);

  return (
    <AuthSessionContext.Provider value={{ session, loading }}>
      {children}
    </AuthSessionContext.Provider>
  );
}
