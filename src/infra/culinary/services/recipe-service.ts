import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { IRecipeService } from '@application/culinary/contracts/recipe-service';
import {
  CreateRecipeRequest,
  GetRecipesRequest,
  UpdateRecipeRequest,
} from '@application/culinary/requests/recipe-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Recipe } from '@domain/culinary/entities/recipe';

export class RecipeService implements IRecipeService {
  constructor(private readonly http: AuthHttpClient) {}

  getAll(request: GetRecipesRequest): Promise<PaginatedResponse<Recipe>> {
    return this.http.get('/culinary/recipes', {
      params: {
        page: request.page,
        pageSize: request.pageSize,
        orderBy: request.orderBy,
        desc: request.desc,
        name: request.name,
        status: request.status,
      },
    });
  }

  getById(id: string): Promise<Recipe | null> {
    return this.http.get(`/culinary/recipes/${id}`);
  }

  create(request: CreateRecipeRequest): Promise<Recipe | null> {
    return this.http.post('/culinary/recipes', request);
  }

  update(request: UpdateRecipeRequest): Promise<Recipe | null> {
    return this.http.put(`/culinary/recipes/${request.id}`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/culinary/recipes/${id}`);
  }

  async imageUpload(id: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append('FeaturedImage', file);

    const result = await this.http.put<Recipe>(
      `/culinary/recipes/${id}/image`,
      formData,
    );
    return result.imageUrl;
  }
}
