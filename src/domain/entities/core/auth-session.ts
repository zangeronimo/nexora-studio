import { User } from './user';
import { UserCompany } from './user-company';

export class AuthSession {
  constructor(
    readonly user: User,
    readonly userCompany: UserCompany,
  ) {}
}
