import { User } from '@domain/core/entities/user';
import { UserCompany } from '@domain/core/entities/user-company';

export class AuthSession {
  constructor(
    readonly user: User,
    readonly userCompany: UserCompany,
  ) {}
}
