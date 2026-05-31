import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { UserProfileService } from '@infra/core/services/user-profile-service';

describe('UserProfileService', () => {
  it('should get authenticated user profile', async () => {
    const get = jest.fn().mockResolvedValue({
      userCompany: {
        id: '10',
        userId: '1',
        user: {
          id: '1',
          name: 'Luciano',
          email: 'luciano@test.com',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01',
        },
        companyId: '99',
        company: {
          id: '2',
          name: 'Tudo Linux',
          createdAt: '2026-01-01',
          updatedAt: '2026-01-01',
        },
        nickName: 'Luciano',
        avatarUrl: null,
        status: 1,
        lastAccessedAt: '2026-01-01',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01',
      },
    });

    const http = {
      get,
      post: jest.fn(),
      patch: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    const sut = new UserProfileService(http as AuthHttpClient);
    const result = await sut.get();
    expect(get).toHaveBeenCalledWith('/core/users/profile');
    expect(result.userCompany.user.email).toBe('luciano@test.com');
  });
});
