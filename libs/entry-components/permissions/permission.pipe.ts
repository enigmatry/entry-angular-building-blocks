import { inject, Pipe, PipeTransform } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Pipe({
    name: 'entryHasPermissions',
    standalone: false
})
export class EntryPermissionPipe<T extends PermissionType> implements PipeTransform {
  private readonly permissionsService = inject(EntryPermissionService<T>);

  transform(permissions: T[]): boolean {
    return this.permissionsService.hasPermissions(permissions);
  }
}
