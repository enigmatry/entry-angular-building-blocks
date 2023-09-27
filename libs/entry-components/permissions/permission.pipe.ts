import { Pipe, PipeTransform } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Pipe({
  name: 'entryHasPermissions'
})
export class EntryPermissionPipe<T extends PermissionType> implements PipeTransform {
  constructor(private permissionsService: EntryPermissionService<T>) { }

  transform(permissions: T[]): boolean {
    return this.permissionsService.hasPermissions(permissions);
  }
}
