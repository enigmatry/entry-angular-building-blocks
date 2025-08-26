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

  private readonly toggleVisibility = (show: boolean): void => {
    const element = this.elementRef.nativeElement;

    if(!show) {
      this.renderer.setStyle(element, 'display', 'none');
      return;
    }

    if (element.style?.display) {
      this.renderer.removeStyle(element, 'display');
    }
  };
}
