import reactDom from 'react-dom/client';
import { App } from './presentation/App';
import { I18nProvider } from './core/i18n/presentation/i18n-provider';
import { LocalStorage } from '@infra/http/clients/local-storage';
import { AuthProvider } from '@presentation/auth/auth-provider';

const container = document.getElementById('root');
const root = reactDom.createRoot(container!);
const storage = new LocalStorage();
root.render(
  <I18nProvider storage={storage}>
    <AuthProvider storage={storage}>
      <App />
    </AuthProvider>
  </I18nProvider>,
);
