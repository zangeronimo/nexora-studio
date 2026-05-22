import { AuthHttpClient } from '@application/contracts/auth/auth-http-client';
import { UserProfileService } from '@application/contracts/core/user-profile-service';
import { AuthSession } from '@domain/entities/auth-session';

export class DefaultUserProfileService implements UserProfileService {
  constructor(private readonly http: AuthHttpClient) {}
  get(): Promise<AuthSession> {
    return this.http.get('/users/profile');
  }
}
