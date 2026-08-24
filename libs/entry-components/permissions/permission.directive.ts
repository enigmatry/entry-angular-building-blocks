import { Directive, ElementRef, ErrorHandler, Renderer2, computed, effect, inject, input } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

const ELEMENT_NODE = 1;

@Directive({
    selector: '[entryPermissionsOnly],[entryPermissionsExcept]',
    standalone: false
})
export class EntryPermissionDirective<T extends PermissionType> {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly permissionService = inject(EntryPermissionService<T>);
  private readonly errorHandler = inject(ErrorHandler);
  private reportedUnsupportedHost = false;

  /** Hides the host element unless the user holds these permissions. */
  readonly only = input<T[] | undefined>(undefined, { alias: 'entryPermissionsOnly' });

  /** Hides the host element when the user holds these permissions. */
  readonly except = input<T[] | undefined>(undefined, { alias: 'entryPermissionsExcept' });

  /**
   * Both aliases are evaluated when both are bound - the host is shown only when `only` is held and
   * `except` is not. The selector allows the combination and neither condition may be ignored.
   *
   * Denies by default: an unresolved binding arrives as `undefined`, and for a permission gate
   * "nothing to check against" has to read as hidden.
   */
  private readonly isHidden = computed(() => {
    const only = this.only();
    const except = this.except();

    if (only === undefined && except === undefined) {
      return true;
    }
    if (only !== undefined && !this.permissionService.hasPermissions(only)) {
      return true;
    }
    return except !== undefined && this.permissionService.hasPermissions(except);
  });

  constructor() {
    // Renderer2 rather than a `[style.display]` host binding: a host binding loses to a static
    // `style` on the same element, leaving `<div style="display: flex" entryPermissionsOnly>` visible.
    effect(() => this.toggleVisibility(!this.isHidden()));
  }

  private readonly toggleVisibility = (show: boolean): void => {
    const element = this.elementRef.nativeElement;

    // `nodeType` rather than `instanceof HTMLElement`: those constructors are browser globals and
    // undefined under a Node SSR renderer. Only the comment node produced by the unsupported
    // `*entryPermissionsOnly` form falls through here.
    if (element?.nodeType !== ELEMENT_NODE) {
      // Reported once, not once per effect run.
      if (!this.reportedUnsupportedHost) {
        this.reportedUnsupportedHost = true;
        this.errorHandler.handleError(new Error(
          'entryPermissionsOnly/entryPermissionsExcept do not support the * form - apply them as a plain attribute'
        ));
      }
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
