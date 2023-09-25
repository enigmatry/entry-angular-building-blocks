import { Pipe, PipeTransform } from '@angular/core';
import { EntryPermission } from './permission';
import { EntryPermissionService } from './permission.service';

@Pipe({
  name: 'entryHasPermission'
})
export class EntryPermissionPipe implements PipeTransform {
  constructor(private permissionsService: EntryPermissionService) { }

  transform(permission: EntryPermission | EntryPermission[]): boolean {
    return this.permissionsService.hasPermission(permission);
  }
}
