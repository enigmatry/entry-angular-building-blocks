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
   *
   * @remarks Denies by default. A binding that has not resolved yet - `[entryPermissionsOnly]="user()?.permissions"`
   * while the profile loads - arrives as `undefined`, and for a permission gate the safe reading of
   * "nothing to check against" is hidden, not visible.
   *
   * `hasPermissions` is not reactive, so this recomputes on input changes only - the same cadence
   * the previous input setters ran at.
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
    // Written through Renderer2 rather than a `[style.display]` host binding: a host binding loses to
    // a static `style` on the same element, so `<div style="display: flex" entryPermissionsOnly>`
    // would stay visible for an unauthorised user.
    effect(() => this.toggleVisibility(!this.isHidden()));
  }

  private readonly toggleVisibility = (show: boolean): void => {
    const element = this.elementRef.nativeElement;

    if (!(element instanceof HTMLElement)) {
      // `*entryPermissionsOnly` puts this directive on an <ng-template>, whose host node is a comment
      // with no `style` - writing to it throws. That form has never worked anyway: no TemplateRef or
      // ViewContainerRef is injected here, so the embedded view is never created and the content
      // simply never appears. Report and bail instead of crashing.
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
