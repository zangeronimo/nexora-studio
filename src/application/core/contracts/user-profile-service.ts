import { AuthSession } from '@domain/base/entities/auth-session';

export interface IUserProfileService {
  get(): Promise<AuthSession>;
  uploadAvatar(file: File): Promise<void>;
  switchCompany(companyId: string): Promise<void>;
}
