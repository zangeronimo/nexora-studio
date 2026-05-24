import reactDom from 'react-dom/client';
import { I18nProvider } from './presentation/i18n/hooks/i18n-provider';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { AuthProvider } from '@presentation/auth/auth-provider';
import { AuthSessionProvider } from '@presentation/session/auth-session-provider';
import { DefaultUserProfileService } from '@infra/services/default-user-profile-service';
import { DefaultAuthHttpClient } from '@infra/http/clients/default-auth-http-client';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';
import { DefaultAuthService } from '@infra/services/default-auth-service';
import { AppRoutes } from '@presentation/router/routes';
import '@presentation/styles/main.scss';
import { JwtAuthorizationProvider } from '@infra/providers/jwt-authorization-provider';
import { StorageLocaleResolver } from '@infra/i18n/resolve-locale';

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
const userProfileService = new DefaultUserProfileService(authHttp);
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
