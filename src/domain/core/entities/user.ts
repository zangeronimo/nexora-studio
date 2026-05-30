import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';

export class User extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly email: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
