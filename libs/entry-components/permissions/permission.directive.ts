import { NgIf } from '@angular/common';
import { Directive, Input, inject } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Directive({
  selector: '[entryPermissionOnly],[entryPermissionExcept]',
  hostDirectives: [{
    directive: NgIf
  }]
})
export class EntryPermissionDirective<T extends PermissionType> {
  private ngIfDirective = inject(NgIf);
  private permissionService = inject(EntryPermissionService<T>);

  @Input('entryPermissionOnly') set only(permission: T | T[]) {
    this.ngIfDirective.ngIf = this.permissionService.hasPermission(permission);
  }

  @Input('entryPermissionExcept') set except(permission: T | T[]) {
    this.ngIfDirective.ngIf = !this.permissionService.hasPermission(permission);
  }
}
