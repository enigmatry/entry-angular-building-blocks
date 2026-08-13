import { Directive, computed, inject, input } from '@angular/core';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

@Directive({
    selector: '[entryPermissionsOnly],[entryPermissionsExcept]',
    standalone: false,
    host: {
      '[style.display]': 'isHidden() ? "none" : null'
    }
})
export class EntryPermissionDirective<T extends PermissionType> {
  private readonly permissionService = inject(EntryPermissionService<T>);

  /** Hides the host element unless the user holds these permissions. */
  readonly only = input<T[] | undefined>(undefined, { alias: 'entryPermissionsOnly' });

  /** Hides the host element when the user holds these permissions. */
  readonly except = input<T[] | undefined>(undefined, { alias: 'entryPermissionsExcept' });

  /**
   * `only` wins when both aliases are bound, which the selector allows but no caller does.
   *
   * @remarks `hasPermissions` is not reactive, so this recomputes on input changes only —
   * the same cadence the previous input setters ran at.
   */
  protected readonly isHidden = computed(() => {
    const only = this.only();
    if (only !== undefined) {
      return !this.permissionService.hasPermissions(only);
    }
    const except = this.except();
    if (except !== undefined) {
      return this.permissionService.hasPermissions(except);
    }
    return false;
  });
}
