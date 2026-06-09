import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';

export class Category extends Entity {
  constructor(
    id: string,
    readonly slug: string,
    readonly name: string,
    readonly status: status,
    createdAt: Date,
    updatedAt: Date,
    readonly displayOrder: number,
    readonly description?: string,
    readonly parentId?: string,
    readonly metaTitle?: string,
    readonly metaDescription?: string,
    readonly canonicalUrl?: string,
    readonly featuredImageUrl?: string,
  ) {
    super(id, createdAt, updatedAt);
  }
}
