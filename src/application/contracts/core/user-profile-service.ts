import { AuthSession } from '@domain/entities/auth-session';

export interface UserProfileService {
  get(): Promise<AuthSession>;
}
