import { Directive, ElementRef, ErrorHandler, Renderer2, computed, effect, inject, input } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Directive({
    selector: '[entryPermissionsOnly],[entryPermissionsExcept]',
    standalone: false
})
export class EntryPermissionDirective<T extends PermissionType> {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly permissionService = inject(EntryPermissionService<T>);
  private readonly errorHandler = inject(ErrorHandler);

  /** Hides the host element unless the user holds these permissions. */
  readonly only = input<T[] | undefined>(undefined, { alias: 'entryPermissionsOnly' });

  /** Hides the host element when the user holds these permissions. */
  readonly except = input<T[] | undefined>(undefined, { alias: 'entryPermissionsExcept' });

  /**
   * `only` wins when both aliases are bound, which the selector allows but no caller does.
   * Denies by default: an unresolved binding arrives as `undefined`, and for a permission gate
   * "nothing to check against" has to read as hidden.
   */
  private readonly isHidden = computed(() => {
    const only = this.only();
    if (only !== undefined) {
      return !this.permissionService.hasPermissions(only);
    }
    const except = this.except();
    if (except !== undefined) {
      return this.permissionService.hasPermissions(except);
    }
    return true;
  });

  constructor() {
    // Renderer2 rather than a `[style.display]` host binding: a host binding loses to a static
    // `style` on the same element, leaving `<div style="display: flex" entryPermissionsOnly>` visible.
    effect(() => this.toggleVisibility(!this.isHidden()));
  }

  private readonly toggleVisibility = (show: boolean): void => {
    const element = this.elementRef.nativeElement;

    // SVG hosts must still be hidden, so `HTMLElement` alone is too narrow. Only the comment node
    // produced by the unsupported `*entryPermissionsOnly` form falls through here.
    if (!(element instanceof HTMLElement) && !(element instanceof SVGElement)) {
      this.errorHandler.handleError(new Error(
        'entryPermissionsOnly/entryPermissionsExcept do not support the * form - apply them as a plain attribute'
      ));
      return;
    }

    if (!show) {
      this.renderer.setStyle(element, 'display', 'none');
      return;
    }

    if (element.style?.display) {
      this.renderer.removeStyle(element, 'display');
    }
  };
}
