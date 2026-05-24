import { createTranslator } from '@application/base/i18n/translator';

describe('createTranslator', () => {
  it('should translate existing key', () => {
    const t = createTranslator({
      login_title: 'Sign in',
    });

    expect(t('login_title')).toBe('Sign in');
  });

  it('should fallback to key when translation does not exist', () => {
    const t = createTranslator({
      login_title: 'Sign in',
    });

    expect(t('missing_key')).toBe('missing_key');
  });

  it('should work with multiple keys', () => {
    const t = createTranslator({
      login_title: 'Sign in',
      button_save: 'Save',
    });

    expect(t('button_save')).toBe('Save');
  });

  it('should fallback to key when dictionary is empty', () => {
    const t = createTranslator({});

    expect(t('login_title')).toBe('login_title');
  });
});
