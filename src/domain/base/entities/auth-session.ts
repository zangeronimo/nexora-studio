import { Company } from '@domain/core/entities/company';
import { UserCompany } from '@domain/system/entities/user-company';

export class AuthSession {
  constructor(
    readonly userCompany: UserCompany,
    readonly companies: Company[],
  ) {}
}
