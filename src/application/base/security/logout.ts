import { AuthService } from '@application/base//security/contracts/auth-service';
import { Storage } from '@application/base/contracts/storage';
import { UseCase } from '@application/base/contracts/use-case';

export class Logout implements UseCase {
  constructor(
    private readonly storage: Storage,
    private readonly authService: AuthService,
  ) {}
  async execute(): Promise<void> {
    try {
      await this.authService.logout();
    } finally {
      this.storage.remove('accessToken');
    }
  }
}
