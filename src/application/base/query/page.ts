export class Page {
  private static readonly DEFAULT = 1;

  private constructor(private readonly current: number) {}

  static create(value?: string | number | null): Page {
    const parsed = Number(value);

    if (Number.isNaN(parsed) || parsed < 1 || !Number.isInteger(parsed)) {
      return new Page(Page.DEFAULT);
    }

    return new Page(parsed);
  }

  value(): number {
    return this.current;
  }

  toString(): string {
    return String(this.current);
  }

  equals(other: Page): boolean {
    return this.current === other.current;
  }
}
