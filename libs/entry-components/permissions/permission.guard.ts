import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EntryPermission } from './permission';
import { EntryPermissionService } from './permission.service';

interface RoutePermissionConfig {
  only?: EntryPermission | EntryPermission[];
  except?: EntryPermission | EntryPermission[];
}

export const entryPermissionGuard: CanActivateFn = (route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) => {
  const permissionService = inject(EntryPermissionService);
  const routePermissions = route.data.permissions as RoutePermissionConfig ?? {};

  if (routePermissions.only) {
    return permissionService.hasPermission(routePermissions.only);
  }
  if (routePermissions.except) {
    return !permissionService.hasPermission(routePermissions.except);
  }

  return false;
};
