import reactDom from 'react-dom/client';
import { App } from './presentation/App';
import { I18nProvider } from './core/i18n/presentation/i18n-provider';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { AuthProvider } from '@presentation/auth/auth-provider';
import { AuthSessionProvider } from '@presentation/session/auth-session-provider';
import { DefaultUserProfileService } from '@infra/services/default-user-profile-service';
import { DefaultAuthHttpClient } from '@infra/http/clients/default-auth-http-client';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';
import { DefaultAuthService } from '@infra/services/default-auth-service';

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
const userProfileService = new DefaultUserProfileService(authHttp);
root.render(
  <I18nProvider storage={storage}>
    <AuthProvider storage={storage}>
      <AuthSessionProvider service={userProfileService}>
        <App />
      </AuthSessionProvider>
    </AuthProvider>
  </I18nProvider>,
);
