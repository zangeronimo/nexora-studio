import { LocalStorage } from '../http/clients/local-storage';
import { JwtAuthorizationProvider } from '../security/providers/jwt-authorization-provider';

export const makeAuthorizationProvider = () => {
  const storage = new LocalStorage();
  return new JwtAuthorizationProvider(storage);
};
