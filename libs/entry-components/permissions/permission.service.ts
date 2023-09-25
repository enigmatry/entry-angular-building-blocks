import { PermissionType } from './permission-type';

export abstract class EntryPermissionService<T extends PermissionType> {
  public abstract hasPermission(permissions: T | T[]): boolean;
}
