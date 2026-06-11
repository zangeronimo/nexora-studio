import { makeAuthHttpClient } from '@infra/base/http/make-auth-http-client';
import { TagService } from '@infra/culinary/services/tag-service';

export const makeTagService = () => {
  return new TagService(makeAuthHttpClient());
};
