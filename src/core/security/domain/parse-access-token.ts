import { AccessTokenPayload } from '../contracts/access-token-payload';

const PERMISSION_REGEX = /^[a-z]+(\.[a-z]+){2}$/;

function isJwtFormat(token: string): boolean {
  if (!token) {
    return false;
  }

  return token.split('.').length === 3;
}

function extractPermissions(payload: { permission?: unknown }): string[] {
  if (!payload.permission) {
    return [];
  }

  const values = Array.isArray(payload.permission)
    ? payload.permission
    : [payload.permission];

  return values.filter(
    (value): value is string =>
      typeof value === 'string' && PERMISSION_REGEX.test(value),
  );
}
function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, '+').replace(/_/g, '/');

  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');

  return atob(padded);
}

export function parseAccessToken(token: string): AccessTokenPayload | null {
  try {
    if (!isJwtFormat(token)) {
      return null;
    }

    const [, payloadBase64] = token.split('.');

    const payload = JSON.parse(decodeBase64Url(payloadBase64)) as {
      companyId?: string;
      permission?: unknown;
    };

    if (!payload.companyId) {
      return null;
    }

    return {
      companyId: payload.companyId,
      permissions: extractPermissions(payload),
    };
  } catch {
    return null;
  }
}
