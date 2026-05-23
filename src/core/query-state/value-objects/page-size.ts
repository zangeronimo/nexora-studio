export class PageSize {
  private static readonly DEFAULT = 10;
  private static readonly ALLOWED_VALUES = [10, 20, 50, 100];

  private constructor(private readonly size: number) {}

  static create(value?: string | number | null): PageSize {
    const parsed = Number(value);

    if (Number.isNaN(parsed) || !PageSize.ALLOWED_VALUES.includes(parsed)) {
      return new PageSize(PageSize.DEFAULT);
    }

    return new PageSize(parsed);
  }

  value(): number {
    return this.size;
  }

  toString(): string {
    return String(this.size);
  }

  equals(other: PageSize): boolean {
    return this.size === other.size;
  }
}
