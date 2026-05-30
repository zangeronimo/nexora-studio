import { AuthHttpClient } from '@application/base/security/contracts/auth-http-client';
import { UserProfileService } from '@infra/core/services/user-profile-service';

describe('UserProfileService', () => {
  it('should get authenticated user profile', async () => {
    const get = jest.fn().mockResolvedValue({
      user: {
        id: '1',
        name: 'Luciano',
        email: 'luciano@test.com',
        createdAt: '2026-01-01',
        updatedAt: '2026-01-01',
      },
      userCompany: {
        id: '10',
        userId: '1',
        companyId: '99',
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
    expect(result.user.email).toBe('luciano@test.com');
  });
});
