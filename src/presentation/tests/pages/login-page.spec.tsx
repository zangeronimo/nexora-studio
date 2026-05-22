import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { LoginPage } from '@presentation/pages/login/login-page';
import { I18nProvider } from '../../../core/i18n/presentation/i18n-provider';
import { AuthProvider } from '@presentation/auth/auth-provider';
import { BrowserRouter } from 'react-router-dom';

describe('LoginPage (i18n aware)', () => {
  const makeStorage = (locale: 'en-US' | 'pt-BR') => ({
    get: jest.fn((key: string) => {
      if (key === 'locale') return locale;
      return null;
    }),
    set: jest.fn(),
    remove: jest.fn(),
  });

  const makeSut = (locale: 'en-US' | 'pt-BR') => {
    const execute = jest.fn().mockResolvedValue(undefined);

    const userLogin = {
      execute,
    };

    const logout = {
      execute: jest.fn(),
    };

    const storage = makeStorage(locale);

    render(
      <I18nProvider storage={storage as any}>
        <AuthProvider storage={storage as any}>
          <BrowserRouter>
            <LoginPage userLogin={userLogin} logout={logout} />
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>,
    );

    return { execute };
  };

  it('should render UI in English', async () => {
    makeSut('en-US');

    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });

  it('should render UI in Portuguese', async () => {
    makeSut('pt-BR');

    expect(
      screen.getByRole('heading', { name: /entrar/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });

  it('should call Login on click', async () => {
    const { execute } = makeSut('pt-BR');

    fireEvent.change(screen.getByTestId(/login_email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.change(screen.getByTestId(/login_password/i), {
      target: { value: '123456' },
    });

    fireEvent.click(
      screen.getByRole('button', {
        name: /entrar/i,
      }),
    );

    await waitFor(() => {
      expect(execute).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: '123456',
      });
    });
  });
});
