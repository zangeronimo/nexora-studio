import { Entity } from '../entity';

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
