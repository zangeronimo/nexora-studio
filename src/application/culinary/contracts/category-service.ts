import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Category } from '@domain/culinary/entities/category';
import {
  CreateCategoryRequest,
  GetCategoriesRequest,
  UpdateCategoryRequest,
} from '../requests/category-request';

export interface ICategoryService {
  getAll: (
    request: GetCategoriesRequest,
  ) => Promise<PaginatedResponse<Category>>;
  getAllParents: () => Promise<Category[]>;
  getById: (id: string) => Promise<Category | null>;
  create: (request: CreateCategoryRequest) => Promise<Category | null>;
  update: (request: UpdateCategoryRequest) => Promise<Category | null>;
  delete: (id: string) => Promise<void>;
}
