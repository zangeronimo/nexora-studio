import { AuthService } from '@application/base/security/contracts/auth-service';
import { Storage } from '@application/base/contracts/storage';
import { UseCase } from '@application/base/contracts/use-case';
import { LoginRequest } from '@application/base/security/requests/login-request';

export class Login implements UseCase<LoginRequest, void> {
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
