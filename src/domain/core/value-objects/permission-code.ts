export class PermissionCode {
  constructor(
    readonly module: string,
    readonly resource: string,
    readonly permission: string,
  ) {
    if (!module?.trim()) {
      throw new Error('Module is required');
    }

    if (!resource?.trim()) {
      throw new Error('Resource is required');
    }

    if (!permission?.trim()) {
      throw new Error('Permission is required');
    }
  }

  toString(): string {
    return [this.module, this.resource, this.permission]
      .map((x) => x.trim().toLowerCase())
      .join('.');
  }

  static parse(code: string): PermissionCode {
    const parts = code.trim().toLowerCase().split('.');

    if (parts.length !== 3) {
      throw new Error(`Invalid permission code: ${code}`);
    }

    const [module, resource, permission] = parts;

    return new PermissionCode(module, resource, permission);
  }
}
