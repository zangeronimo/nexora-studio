import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Recipe } from '@domain/culinary/entities/recipe';
import {
  CreateRecipeRequest,
  GetRecipesRequest,
  UpdateRecipeRequest,
} from '../requests/recipe-request';

export interface IRecipeService {
  getAll: (request: GetRecipesRequest) => Promise<PaginatedResponse<Recipe>>;
  getById: (id: string) => Promise<Recipe | null>;
  create: (request: CreateRecipeRequest) => Promise<Recipe | null>;
  update: (request: UpdateRecipeRequest) => Promise<Recipe | null>;
  delete: (id: string) => Promise<void>;
  imageUpload: (id: string, file: File) => Promise<string>;
}
