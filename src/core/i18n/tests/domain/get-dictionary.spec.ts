import { getDictionary } from '../../domain/get-dictionary';
import { Locale } from '../../domain/locale';

describe('getDictionary (strict behavior)', () => {
  it('should return different values for different locales', () => {
    const en = getDictionary(Locale.EN_US);
    const pt = getDictionary(Locale.PT_BR);

    expect(en.login_title).not.toBe(pt.login_title);
  });

  it('should fallback to en-US when dictionary is undefined', () => {
    const dict = getDictionary(undefined as any);

    expect(dict.login_title).toBeDefined();
  });
});
