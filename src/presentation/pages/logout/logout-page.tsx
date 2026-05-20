import { useEffect } from 'react';
import { UseCase } from '@application/contracts/use-cases/use-case';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@presentation/auth/use-auth';

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
