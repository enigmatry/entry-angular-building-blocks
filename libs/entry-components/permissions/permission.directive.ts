import { Directive, Input, inject, ElementRef, Renderer2 } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Directive({
    selector: '[entryPermissionsOnly],[entryPermissionsExcept]',
    standalone: false
})
export class EntryPermissionDirective<T extends PermissionType> {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private permissionService = inject(EntryPermissionService<T>);

  @Input('entryPermissionsOnly') set only(permissions: T[]) {
    this.toggleVisibility(this.permissionService.hasPermissions(permissions));
  }

  @Input('entryPermissionsExcept') set except(permissions: T[]) {
    this.toggleVisibility(!this.permissionService.hasPermissions(permissions));
  }

  private toggleVisibility(show: boolean): void {
    if (show) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'none');
    }
  }
}
