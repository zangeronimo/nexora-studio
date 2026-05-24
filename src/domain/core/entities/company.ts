import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';

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
