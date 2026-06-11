import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { ITagService } from '@application/culinary/contracts/tag-service';
import {
  CreateTagRequest,
  GetTagsRequest,
  UpdateTagRequest,
} from '@application/culinary/requests/tag-request';
import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Tag } from '@domain/culinary/entities/tag';

export class TagService implements ITagService {
  constructor(private readonly http: AuthHttpClient) {}

  getAll(request: GetTagsRequest): Promise<PaginatedResponse<Tag>> {
    return this.http.get('/culinary/tags', {
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

  getById(id: string): Promise<Tag | null> {
    return this.http.get(`/culinary/tags/${id}`);
  }

  create(request: CreateTagRequest): Promise<Tag | null> {
    return this.http.post('/culinary/tags', request);
  }

  update(request: UpdateTagRequest): Promise<Tag | null> {
    return this.http.put(`/culinary/tags/${request.id}`, request);
  }

  delete(id: string): Promise<void> {
    return this.http.delete(`/culinary/tags/${id}`);
  }
}
