import { DefaultAuthService } from '../security/services/default-auth-service';
import { DefaultAuthHttpClient } from './clients/default-auth-http-client';
import { FetchHttpClient } from './clients/fetch-http-client';
import { LocalStorage } from './clients/local-storage';

export const makeAuthHttpClient = () => {
  const httpClient = new FetchHttpClient();
  const storage = new LocalStorage();
  const authService = new DefaultAuthService(httpClient);
  return new DefaultAuthHttpClient(
    httpClient,
    storage,
    process.env.API_URL,
    authService,
  );
};
