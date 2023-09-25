import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionType } from './permission-type';
import { EntryPermissionService } from './permission.service';

interface RoutePermissionConfig<T extends PermissionType> {
  only?: T | T[];
  except?: T | T[];
}

export const entryPermissionGuard: CanActivateFn =
<T extends PermissionType> (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const permissionService = inject(EntryPermissionService);
  const routePermissions = route.data.permissions as RoutePermissionConfig<T> ?? {};

  if (routePermissions.only) {
    return permissionService.hasPermission(routePermissions.only);
  }
  if (routePermissions.except) {
    return !permissionService.hasPermission(routePermissions.except);
  }

  return false;
};
