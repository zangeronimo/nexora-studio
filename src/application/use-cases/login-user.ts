import { UseCase } from '@application/contracts/use-cases/use-case';
import { LoginRequest } from '@application/requests/use-cases/login-request';

export class LoginUser implements UseCase<LoginRequest, void> {
  constructor(private readonly authService: any) {}

  async execute(input: LoginRequest) {
    return this.authService.login(input);
  }
}
