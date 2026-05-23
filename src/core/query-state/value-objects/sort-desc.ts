export class SortDesc {
  private constructor(private readonly desc: boolean) {}

  static create(value?: string | boolean | null): SortDesc {
    if (typeof value === 'boolean') {
      return new SortDesc(value);
    }

    return new SortDesc(value === 'true');
  }

  value(): boolean {
    return this.desc;
  }

  toString(): string {
    return String(this.desc);
  }

  equals(other: SortDesc): boolean {
    return this.desc === other.desc;
  }
}
