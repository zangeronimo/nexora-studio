export const Locale = {
  EN_US: 'en-US',
  PT_BR: 'pt-BR',
} as const;

const VALUES = Object.values(Locale);
export const isLocale = (value: string): value is Locale => {
  return VALUES.includes(value as Locale);
};
export type Locale = (typeof Locale)[keyof typeof Locale];
export const DEFAULT_LOCALE: Locale = Locale.EN_US;
