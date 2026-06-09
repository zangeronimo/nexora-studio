import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { ICategoryService } from '@application/culinary/contracts/category-service';
import {
  CreateCategoryRequest,
  GetCategoriesRequest,
  UpdateCategoryRequest,
} from '@application/culinary/requests/category-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Category } from '@domain/culinary/entities/category';

export class CategoryService implements ICategoryService {
  constructor(private readonly http: AuthHttpClient) {}

  getAll(request: GetCategoriesRequest): Promise<PaginatedResponse<Category>> {
    return this.http.get('/culinary/categories', {
      params: {
        page: request.page,
        pageSize: request.pageSize,
        orderBy: request.orderBy,
        desc: request.desc,
        name: request.name,
        status: request.status,
        parent: request.parent,
      },
    });
  }

  getAllParents(): Promise<Category[]> {
    return this.http.get('/culinary/categories/parents');
  }

  getById(id: string): Promise<Category | null> {
    return this.http.get(`/culinary/categories/${id}`);
  }

  create(request: CreateCategoryRequest): Promise<Category | null> {
    return this.http.post('/culinary/categories', request);
  }

  update(request: UpdateCategoryRequest): Promise<Category | null> {
    return this.http.put(`/culinary/categories/${request.id}`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/culinary/categories/${id}`);
  }
}
