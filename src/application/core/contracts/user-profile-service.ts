import { AuthSession } from '@domain/base/entities/auth-session';

export interface IUserProfileService {
  get(): Promise<AuthSession>;
}
