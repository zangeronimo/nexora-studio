import { Entity } from '@domain/base/entities/entity';
import { status } from '@domain/base/enums/status';
import { recipeDifficulty } from '../enums/recipe-difficulty';

export class Recipe extends Entity {
  constructor(
    id: string,
    readonly slug: string,
    readonly name: string,
    readonly shortDescription: string,
    readonly fullDescription: string,
    readonly sections: {
      title: string | null;
      ingredients: { description: string }[];
      steps: { order: number; instruction: string }[];
    }[],
    readonly notes: string[],
    readonly prepTime: number,
    readonly cookTime: number,
    readonly restTime: number,
    readonly yieldTotal: string,
    readonly difficulty: recipeDifficulty,
    readonly cuisine: string,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly canonicalUrl: string | null,
    readonly imageUrl: string | null,
    readonly averageRating: number,
    readonly totalRatings: number,
    readonly status: status,
    readonly tagIds: string[],
    readonly categoryId: string,
    readonly publishedAt: Date | null,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
