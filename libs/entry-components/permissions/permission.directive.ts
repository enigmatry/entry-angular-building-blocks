import { NgIf } from '@angular/common';
import { Directive, Input, inject } from '@angular/core';
import { EntryPermission } from './permission';
import { EntryPermissionService } from './permission.service';

@Directive({
  selector: '[entryPermissionOnly],[entryPermissionExcept]',
  hostDirectives: [{
    directive: NgIf
  }]
})
export class EntryPermissionDirective {
  private ngIfDirective = inject(NgIf);
  private permissionService = inject(EntryPermissionService);

  @Input('entryPermissionOnly') set only(permission: EntryPermission | EntryPermission[]) {
    this.ngIfDirective.ngIf = this.permissionService.hasPermission(permission);
  }

  @Input('entryPermissionExcept') set except(permission: EntryPermission | EntryPermission[]) {
    this.ngIfDirective.ngIf = !this.permissionService.hasPermission(permission);
  }
}
