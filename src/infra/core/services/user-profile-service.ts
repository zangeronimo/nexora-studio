import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IUserProfileService } from '@application/core/contracts/user-profile-service';
import { AuthSession } from '@domain/base/entities/auth-session';

export class UserProfileService implements IUserProfileService {
  constructor(private readonly http: AuthHttpClient) {}
  get(): Promise<AuthSession> {
    return this.http.get('/core/users/profile');
  }

  uploadAvatar(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('Avatar', file);

    return this.http.put(`/core/users/profile/avatar`, formData);
  }

  async switchCompany(companyId: string): Promise<void> {
    const result = await this.http.post<any>(`/switch-company`, { companyId });
    localStorage.setItem('accessToken', JSON.stringify(result.token));
  }
}
