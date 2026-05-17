import reactDom from 'react-dom/client';
import { App } from './presentation/App';
import { I18nProvider } from './core/i18n/presentation/i18n-provider';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { AuthProvider } from '@presentation/auth/auth-provider';
import { DefaultAuthService } from '@infra/services/default-auth-service';
import { FetchHttpClient } from '@infra/http/clients/fetch-http-client';

const container = document.getElementById('root');
const root = reactDom.createRoot(container!);
const storage = new LocalStorage();
const http = new FetchHttpClient();
const authService = new DefaultAuthService(http);
root.render(
  <I18nProvider storage={storage}>
    <AuthProvider storage={storage} authService={authService}>
      <App />
    </AuthProvider>
  </I18nProvider>,
);
