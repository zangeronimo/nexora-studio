import { User } from './core/user';
import { UserCompany } from './core/user-company';

export class AuthSession {
  constructor(
    readonly user: User,
    readonly userCompany: UserCompany,
  ) {}
}
