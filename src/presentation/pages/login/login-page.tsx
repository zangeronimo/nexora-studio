import { useState } from 'react';
import { useTranslation } from '../../../core/i18n/presentation/use-translation';
import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';

type Props = {
  userLogin: UseCase<LoginRequest, void>;
};

export const LoginPage = ({ userLogin }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();

  function handleSubmit() {
    userLogin.execute({ email, password });
  }
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
