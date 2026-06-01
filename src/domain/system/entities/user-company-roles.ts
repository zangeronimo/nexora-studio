export class UserCompanyRoles {
  constructor(
    readonly module: { id: string; name: string },
    readonly roles: { id: string; name: string }[],
    readonly selectedRoleId?: string,
  ) {}
}
