# Entry Permissions

Reusable angular components for applying permission-based authorization:
- Route guard
- View directives
- Pipe

## Integration

Permissions is part of the `@enigmatry/entry-components`:

```npm
npm i @enigmatry/entry-components
```

Create a permission service that implements EntryPermissionService&lt;T&gt; where T is the permission type that you use in your application. You need to provide implementation of the hasPermissions method (for example by checking if the logged in user has needed permissions). 

```ts
export class PermissionService implements EntryPermissionService<PermissionId> {
  hasPermissions(permissions: PermissionId[]): boolean {
    // TODO: provide implementation
  }
}
```

Import permissions module:

```ts
import { EntryPermissionModule } from '@enigmatry/entry-components/permissions';
```

Provide implementation of the EntryPermissionService:

```ts
providers: [
    {
        provide: EntryPermissionService,
        useClass: PermissionService
    }
]
```

<!-- `PermissionService` should be provided in the root scope. -- TODO: add more details with example from the blueprint app  -->

## Basic usage

### Route guard

```ts
    canActivate: [entryPermissionGuard],
    data: {
        permissions: {
        only: [PermissionId.UsersRead]
        }
    }
```

### View directives

```html
 <button mat-menu-item *entryPermissionsOnly="[PermissionId.UsersRead]" routerLink="users">Users</button>
```

### Pipe

```ts
[isEnabled]="[PermissionId.UsersWrite] | entryHasPermissions"
```