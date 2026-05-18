import { AuthSession } from '@domain/entities/core/auth-session';

export interface UserProfileService {
  get(): Promise<AuthSession>;
}
