import reactDom from 'react-dom/client';
import { LocalStorage } from '@infra/base/http/clients/local-storage';
import { AuthProvider } from '@presentation/base/auth/auth-provider';
import { AuthSessionProvider } from '@presentation/base/session/auth-session-provider';
import { UserProfileService } from '@infra/core/services/user-profile-service';
import { DefaultAuthHttpClient } from '@infra/base/http/clients/default-auth-http-client';
import { FetchHttpClient } from '@infra/base/http/clients/fetch-http-client';
import { DefaultAuthService } from '@infra/base/security/services/default-auth-service';
import { AppRoutes } from '@presentation/base/router/routes';
import '@presentation/base/styles/main.scss';
import { JwtAuthorizationProvider } from '@infra/base/security/providers/jwt-authorization-provider';
import { StorageLocaleResolver } from '@infra/base/i18n/resolve-locale';
import { I18nProvider } from '@presentation/base/i18n/hooks/i18n-provider';

const container = document.getElementById('root');
const root = reactDom.createRoot(container!);
const fetchHttp = new FetchHttpClient();
const storage = new LocalStorage();
const authService = new DefaultAuthService(fetchHttp);
const authHttp = new DefaultAuthHttpClient(
  fetchHttp,
  storage,
  process.env.API_URL!,
  authService,
);
const authorizationProvider = new JwtAuthorizationProvider(storage);
const userProfileService = new UserProfileService(authHttp);
const localeResolver = new StorageLocaleResolver(storage);
root.render(
  <I18nProvider localeResolver={localeResolver}>
    <AuthProvider storage={storage}>
      <AuthSessionProvider service={userProfileService}>
        <AppRoutes authorizationProvider={authorizationProvider} />
      </AuthSessionProvider>
    </AuthProvider>
  </I18nProvider>,
);
