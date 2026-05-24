import { useEffect } from 'react';
import { UseCase } from '@application/base/contracts/use-case';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@presentation/base/auth/use-auth';

type Props = {
  logout: UseCase;
};

export const LogoutPage = ({ logout }: Props) => {
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  useEffect(() => {
    logout.execute().finally(() => {
      setAuthenticated(false);
      navigate('/login', { replace: true });
    });
  }, []);

  return <></>;
};
