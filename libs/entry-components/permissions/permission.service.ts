import { EntryPermission } from './permission';

export abstract class EntryPermissionService {
  public abstract hasPermission(permissions: EntryPermission | EntryPermission[]): boolean;
}
