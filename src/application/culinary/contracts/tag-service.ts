import { PaginatedResponse } from '@application/base/response/paginated-response';
import { Tag } from '@domain/culinary/entities/tag';
import {
  CreateTagRequest,
  GetTagsRequest,
  UpdateTagRequest,
} from '../requests/tag-request';

export interface ITagService {
  getAll: (request: GetTagsRequest) => Promise<PaginatedResponse<Tag>>;
  getById: (id: string) => Promise<Tag | null>;
  create: (request: CreateTagRequest) => Promise<Tag | null>;
  update: (request: UpdateTagRequest) => Promise<Tag | null>;
  delete: (id: string) => Promise<void>;
}
