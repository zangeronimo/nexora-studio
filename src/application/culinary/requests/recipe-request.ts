import { PaginationRequest } from '@application/base/requests/pagination-request';
import { status } from '@domain/base/enums/status';
import { recipeDifficulty } from '@domain/culinary/enums/recipe-difficulty';

export class GetRecipesRequest extends PaginationRequest {
  constructor(
    readonly page = 1,
    readonly pageSize = 10,
    readonly orderBy = 'name',
    readonly desc = false,
    readonly name?: string,
    readonly status?: status,
  ) {
    super(page, pageSize, orderBy, desc);
  }
}

export class CreateRecipeRequest {
  constructor(
    readonly name: string,
    readonly shortDescription: string,
    readonly fullDescription: string,
    readonly sections: RecipeSectionRequest[],
    readonly notes: string[],
    readonly prepTime: number,
    readonly cookTime: number,
    readonly restTime: number,
    readonly yieldTotal: string,
    readonly difficult: recipeDifficulty,
    readonly cuisine: string,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly canonicalUrl: string,
    readonly status: status,
    readonly categoryId: string,
  ) {}
}

export class RecipeSectionRequest {
  title: string | null;
  ingredients: { description: string }[];
  steps: { order: number; instruction: string }[];
}

export class UpdateRecipeRequest {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly shortDescription: string,
    readonly fullDescription: string,
    readonly sections: RecipeSectionRequest[],
    readonly notes: string[],
    readonly prepTime: number,
    readonly cookTime: number,
    readonly restTime: number,
    readonly yieldTotal: string,
    readonly difficulty: recipeDifficulty,
    readonly cuisine: string,
    readonly metaTitle: string,
    readonly metaDescription: string,
    readonly canonicalUrl: string,
    readonly status: status,
    readonly categoryId: string,
  ) {}
}
