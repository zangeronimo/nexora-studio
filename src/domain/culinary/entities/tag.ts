import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';

export class Tag extends Entity {
  constructor(
    id: string,
    readonly slug: string,
    readonly name: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
    readonly description?: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
