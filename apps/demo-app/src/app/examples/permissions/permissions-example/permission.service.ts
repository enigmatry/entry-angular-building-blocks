import { Injectable } from '@angular/core';
import { EntryPermissionService } from '@enigmatry/entry-components/permissions';

@Injectable()
export class PermissionExampleService implements EntryPermissionService<string> {
  private permissions = ['user.read', 'user.write'];

  constructor() { }

  public hasPermissions(permissions: string[]): boolean {
    return permissions.some(permission => this.permissions.includes(permission));
  }
}
