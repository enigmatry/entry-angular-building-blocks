import { NgIf } from '@angular/common';
import { Directive, Input, inject } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Directive({
  selector: '[entryPermissionsOnly],[entryPermissionsExcept]',
  hostDirectives: [{
    directive: NgIf
  }]
})
export class EntryPermissionDirective<T extends PermissionType> {
  private ngIfDirective = inject(NgIf);
  private permissionService = inject(EntryPermissionService<T>);

  @Input('entryPermissionsOnly') set only(permissions: T[]) {
    this.ngIfDirective.ngIf = this.permissionService.hasPermissions(permissions);
  }

  @Input('entryPermissionsExcept') set except(permissions: T[]) {
    this.ngIfDirective.ngIf = !this.permissionService.hasPermissions(permissions);
  }
}
