import { UserCompany } from '@domain/system/entities/user-company';

export class AuthSession {
  constructor(readonly userCompany: UserCompany) {}
}
