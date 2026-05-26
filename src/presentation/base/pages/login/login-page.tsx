import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseCase } from '@application/base/contracts/use-case';
import { LoginRequest } from '@application/base/security/requests/login-request';

import { useTranslation } from '@presentation/base/i18n/hooks/use-translation';

import { useAuth } from '@presentation/base/auth/use-auth';

import { Card } from '@presentation/base/components/card';
import { Input } from '@presentation/base/components/input';
import { Button } from '@presentation/base/components/button';

import * as styles from './styles.module.scss';

type Props = {
  login: UseCase<LoginRequest, void>;
  logout: UseCase;
};

export const LoginPage = ({ login, logout }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit() {
    try {
      setLoading(true);

      await login.execute({
        email,
        password,
      });

      setAuthenticated(true);

      navigate('/');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    logout.execute();

    setAuthenticated(false);
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.backgroundGlow} />

      <div className={styles.content}>
        <section className={styles.brandSection}>
          <span className={styles.badge}>NEXORA</span>

          <h1 className={styles.title}>Business Operating Platform</h1>

          <p className={styles.subtitle}>{t('login.subtitle')}</p>
        </section>

        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{t('login.title')}</h2>

            <p className={styles.cardDescription}>{t('login.description')}</p>
          </div>

          <div className={styles.form}>
            <Input
              label={t('login.email.label')}
              id="login_email"
              type="email"
              placeholder={t('login.email.placeholder')}
              value={email}
              onChange={setEmail}
              fullWidth
            />

            <Input
              label={t('login.password.label')}
              id="login_password"
              type="password"
              placeholder={t('login.password.placeholder')}
              value={password}
              onChange={setPassword}
              fullWidth
            />

            <Button
              type="button"
              onClick={handleSubmit}
              loading={loading}
              fullWidth
            >
              {t('login.button.enter')}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};
