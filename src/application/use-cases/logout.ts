import { Storage } from '@application/contracts/core/storage';
import { UseCase } from '@application/contracts/use-cases/use-case';

export class Logout implements UseCase {
  constructor(private readonly storage: Storage) {}
  async execute(): Promise<void> {
    this.storage.remove('accessToken');
  }
}
