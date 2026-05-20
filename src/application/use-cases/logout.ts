import { AuthService } from '@application/contracts/auth/auth-service';
import { Storage } from '@application/contracts/core/storage';
import { UseCase } from '@application/contracts/use-cases/use-case';

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
