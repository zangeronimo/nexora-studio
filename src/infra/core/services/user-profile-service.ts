import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IUserProfileService } from '@application/core/contracts/user-profile-service';
import { AuthSession } from '@domain/base/entities/auth-session';

export class UserProfileService implements IUserProfileService {
  constructor(private readonly http: AuthHttpClient) {}
  get(): Promise<AuthSession> {
    return this.http.get('/core/users/profile');
  }
}
