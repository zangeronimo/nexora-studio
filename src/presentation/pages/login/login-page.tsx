import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';

import { useTranslation } from '@presentation/i18n/hooks/use-translation';

import { useAuth } from '@presentation/auth/use-auth';

import { Card } from '@presentation/shared/components/card';
import { Input } from '@presentation/shared/components/input';
import { Button } from '@presentation/shared/components/button';

import * as styles from './styles.module.scss';

type Props = {
  userLogin: UseCase<LoginRequest, void>;
  logout: UseCase;
};

export const LoginPage = ({ userLogin, logout }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { setAuthenticated } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit() {
    try {
      setLoading(true);

      await userLogin.execute({
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

          <p className={styles.subtitle}>{t('login_subtitle')}</p>
        </section>

        <Card className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>{t('login_title')}</h2>

            <p className={styles.cardDescription}>{t('login_description')}</p>
          </div>

          <div className={styles.form}>
            <Input
              label={t('login_email')}
              id="login_email"
              type="email"
              placeholder={t('login_email_placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />

            <Input
              label={t('login_password')}
              id="login_password"
              type="password"
              placeholder={t('login_password_placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />

            <Button
              type="button"
              onClick={handleSubmit}
              loading={loading}
              fullWidth
            >
              {t('login_button')}
            </Button>
          </div>
        </Card>
      </div>
    </main>
  );
};
