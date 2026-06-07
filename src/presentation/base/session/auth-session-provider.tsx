import { useEffect, useState } from 'react';
import { AuthSessionContext } from './auth-session-context';
import { AuthSession } from '@domain/base/entities/auth-session';
import { IUserProfileService } from '@application/core/contracts/user-profile-service';
import { useAuth } from '@presentation/base/auth/use-auth';
import { useToast } from '../toast/hooks/use-toast';
import { useTranslation } from '../i18n/hooks/use-translation';

type Props = {
  children: React.ReactNode;
  service: IUserProfileService;
};

export function AuthSessionProvider({ children, service }: Props) {
  const { authenticated, setAuthenticated } = useAuth();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState<boolean>(authenticated);
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation();
  const toast = useToast();

  const handleAvatarUpload = async (file: File) => {
    try {
      setLoading(true);

      await service.uploadAvatar(file);
      toast.success(t('common.toast.success.updated'));
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      setRefresh((old) => !old);
    }
  };

  const switchCompany = async (companyId: string) => {
    try {
      setLoading(true);
      await service.switchCompany(companyId);
      toast.success(t('common.toast.switch_company.success'));
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

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
  }, [authenticated, refresh]);

  return (
    <AuthSessionContext.Provider
      value={{ session, loading, handleAvatarUpload, switchCompany }}
    >
      {children}
    </AuthSessionContext.Provider>
  );
}
