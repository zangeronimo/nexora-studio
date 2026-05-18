import { AuthService } from '@application/contracts/auth/auth-service';
import { Storage } from '@application/contracts/core/storage';
import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';

export class UserLogin implements UseCase<LoginRequest, void> {
  constructor(
    private readonly authService: AuthService,
    private readonly storage: Storage,
    private readonly callback: (authenticated: boolean) => void,
  ) {}
  async execute(input: LoginRequest): Promise<void> {
    const token = await this.authService.login({
      email: input.email,
      password: input.password,
    });
    this.storage.set('accessToken', token);
    this.callback(true);
  }
}
