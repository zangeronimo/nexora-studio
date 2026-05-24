import { Entity } from '@domain/base/entities/entity';

export class User extends Entity {
  constructor(
    id: string,
    readonly name: string,
    readonly email: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
