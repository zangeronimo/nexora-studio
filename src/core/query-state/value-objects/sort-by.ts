export class SortBy {
  private constructor(private readonly field?: string) {}

  static create(value?: string | null): SortBy {
    if (!value?.trim()) {
      return new SortBy(undefined);
    }

    return new SortBy(value);
  }

  value(): string | undefined {
    return this.field;
  }

  toString(): string {
    return this.field ?? '';
  }

  isDefined(): boolean {
    return !!this.field;
  }

  equals(other: SortBy): boolean {
    return this.field === other.field;
  }
}
