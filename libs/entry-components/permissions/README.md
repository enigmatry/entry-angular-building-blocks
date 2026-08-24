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

> **Angular 22 — check your `paramsInheritanceStrategy`**
>
> `entryPermissionGuard` reads `route.data['permissions']` and denies access when it is absent.
> Angular 22 changed the router's default `paramsInheritanceStrategy` from `'emptyOnly'` to
> `'always'`, so a child route that defines no `data.permissions` of its own now **inherits its
> parent's** instead of being denied.
>
> If you rely on deny-by-default for child routes, pin the previous behaviour:
>
> ```ts
> RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'emptyOnly' })
> // or, for a standalone bootstrap:
> provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'emptyOnly' }))
> ```
>
> Otherwise, audit every child route under a permission-guarded parent. In dev mode the guard logs a
> warning whenever the permissions it checked were inherited from an ancestor route rather than
> declared on the route itself.

### View directives

```html
 <button mat-menu-item [entryPermissionsOnly]="[PermissionId.UsersRead]" routerLink="users">Users</button>
 <button mat-menu-item [entryPermissionsExcept]="[PermissionId.Suspended]" routerLink="orders">Orders</button>
```

Both are plain attribute directives — they set `display: none` on the host rather than removing it
from the DOM, so the `*` form is not supported and is reported through `ErrorHandler`.

An unresolved binding (`[entryPermissionsOnly]="user()?.permissions"` while the profile loads) hides
the host: for a permission gate, "nothing to check against" has to read as denied. Bind an empty
array where you mean "no restriction". When both aliases are bound, both are evaluated — the host is
shown only when `entryPermissionsOnly` is held and `entryPermissionsExcept` is not.

### Pipe

```ts
[isEnabled]="[PermissionId.UsersWrite] | entryHasPermissions"
```