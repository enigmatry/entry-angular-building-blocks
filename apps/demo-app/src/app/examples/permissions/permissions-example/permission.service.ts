import { Injectable } from '@angular/core';
import { EntryPermissionService } from '@enigmatry/entry-components/permissions';

@Injectable()
export class PermissionExampleService implements EntryPermissionService<string> {
  private permissions = ['user.read', 'user.write'];

  readonly hasPermissions = (permissions: string[]) => permissions.some(permission => this.permissions.includes(permission));
}
