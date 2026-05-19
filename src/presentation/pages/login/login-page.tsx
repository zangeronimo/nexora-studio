import { useEffect, useState } from 'react';
import { useTranslation } from '../../../core/i18n/presentation/use-translation';
import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@presentation/auth/use-auth';

type Props = {
  userLogin: UseCase<LoginRequest, void>;
  logout: UseCase;
};

export const LoginPage = ({ userLogin, logout }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit() {
    await userLogin.execute({ email, password });
    setAuthenticated(true);
    navigate('/');
  }

  useEffect(() => {
    logout.execute();
    setAuthenticated(false);
  }, []);

  return (
    <main>
      <h1>{t('login_title')}</h1>
      <label>{t('login_email')}</label>
      <input
        type="email"
        placeholder={t('login_email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>{t('login_password')}</label>
      <input
        type="password"
        placeholder={t('login_password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="button" onClick={handleSubmit}>
        {t('login_button')}
      </button>
    </main>
  );
};
