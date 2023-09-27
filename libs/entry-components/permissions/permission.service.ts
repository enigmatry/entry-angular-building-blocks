import { PermissionType } from './permission-type';

export abstract class EntryPermissionService<T extends PermissionType> {
  public abstract hasPermissions(permissions: T[]): boolean;
}
