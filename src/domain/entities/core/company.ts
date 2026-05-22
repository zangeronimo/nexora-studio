import { status } from '@domain/enums/status';
import { Entity } from '../entity';

export class Company extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
