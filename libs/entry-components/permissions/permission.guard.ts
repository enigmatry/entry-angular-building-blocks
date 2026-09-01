import { inject, isDevMode } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

interface RoutePermissionConfig<T extends PermissionType> {
  only?: T[];
  except?: T[];
}

/**
 * Angular 22 changed the router's default `paramsInheritanceStrategy` from `'emptyOnly'` to
 * `'always'`, so a route without its own `data.permissions` now inherits its parent's instead of
 * being denied. The guard keeps reading the resolved `route.data` (changing that would deny routes
 * that legitimately inherited under `'emptyOnly'`), but says so out loud in dev mode.
 */
const warnOnInheritedPermissions = (route: ActivatedRouteSnapshot): void => {
  if (!isDevMode() || !route.data['permissions'] || route.routeConfig?.data?.['permissions']) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(
    `[entryPermissionGuard] Route '${route.routeConfig?.path ?? ''}' declares no data.permissions of its own - `
    + 'the permissions being checked were inherited from an ancestor route. '
    + `Set paramsInheritanceStrategy: 'emptyOnly' or declare data.permissions on this route explicitly.`
  );
};

export const entryPermissionGuard: CanActivateFn =
<T extends PermissionType> (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const permissionService = inject(EntryPermissionService);
  const routePermissions = route.data['permissions'] as RoutePermissionConfig<T> ?? {};

  warnOnInheritedPermissions(route);

  if (routePermissions.only) {
    return permissionService.hasPermissions(routePermissions.only);
  }
  if (routePermissions.except) {
    return !permissionService.hasPermissions(routePermissions.except);
  }

  return false;
};
