import { Pipe, PipeTransform } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Pipe({
  name: 'entryHasPermission'
})
export class EntryPermissionPipe<T extends PermissionType> implements PipeTransform {
  constructor(private permissionsService: EntryPermissionService<T>) { }

  transform(permission: T | T[]): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
