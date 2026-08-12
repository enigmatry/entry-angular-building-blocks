# Entry Components

Set of reusable components based on Angular material.

Visit components demo application. [Website](https://entry-demo.enigmatry.com/)

## Installation

```ts
npm install @enigmatry/entry-components
```

### Theming Guidelines

These guides provides detailed steps for setting up and configuring theming within your project.

[**Theming Setup Guide**](https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-setup.md)

[**Theming Configuration Guide**](https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/theming-configuration.md)


## Compatibility with Angular versions

| @enigmatry/entry-components | Angular version
|-|-|
|14.x| = 14
|15.x| = 15
|16.x| = 16
|17.x| = 17
|18.x| = 18
|19.x| = 19
|20.x| = 20
|21.x| = 21
|22.x| = 22

## Migrating to 22.x

`22.x` requires Angular 22, TypeScript ~6.0 and Node `^22.22.3 || ^24.15.0 || >=26.0.0`. Run
`ng update @angular/core@22 @angular/cli@22 @angular/cdk@22 @angular/material@22` first, then work
through the four items below — three of them change behaviour silently.

### 1. `@angular/animations` is no longer a peer dependency

Angular Material 22 animates with native CSS, so `@enigmatry/entry-components` and
`@enigmatry/entry-form` dropped their `@angular/animations` peer dependency. Remove the provider
from your bootstrap:

```diff
- import { provideAnimations } from '@angular/platform-browser/animations';
...
- providers: [provideHttpClient(), provideAnimations()]
+ providers: [provideHttpClient()]
```

If nothing else in your app needs it, drop `@angular/animations` from your `package.json` too.
`BrowserAnimationsModule` / `provideAnimations()` still work, they are just dead weight.

### 2. The router's `paramsInheritanceStrategy` default changed to `'always'`

This affects `entryPermissionGuard`, which reads `route.data['permissions']` and denies access when
it is absent. Under the new default a child route that declares no `data.permissions` of its own
**inherits its parent's**, so a route that used to be denied is now allowed to anyone who cleared
the parent.

Pin the previous behaviour, or audit every child route under a permission-guarded parent:

```ts
RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'emptyOnly' })
// or, for a standalone bootstrap:
provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'emptyOnly' }))
```

In dev mode the guard now logs a warning when the permissions it checked came from an ancestor
route. See [the permissions readme](https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/permissions/README.md)
for details.

### 3. `ChangeDetectionStrategy.OnPush` is the framework default

Every component that does not declare `changeDetection` explicitly — including all of yours — is
now `OnPush`. Components that mutate template-bound state outside of an Angular event (from an RxJS
subscription, a `setTimeout`, a callback passed to a third-party library, or a method a parent calls
imperatively via `@ViewChild`) will stop repainting.

Either mark the view dirty at the mutation site:

```ts
private readonly changeDetectorRef = inject(ChangeDetectorRef);
...
this.someService.updates$.subscribe(value => {
  this.value = value;
  this.changeDetectorRef.markForCheck();
});
```

…or move the state onto signals, which mark the view for you. To defer the work on a specific
component, opt back out with `changeDetection: ChangeDetectionStrategy.Default`.

### 4. TypeScript 6 rejects `baseUrl`

`baseUrl` was removed from `tsconfig.json` (TS5101). If your `tsconfig` relied on it for
workspace-absolute imports, replace it with explicit `paths` entries — note that `paths` are
resolved relative to the `tsconfig` file that declares them once `baseUrl` is gone, so paths in a
nested `tsconfig.lib.json` need the `../..` prefix.

## License

Apache-2 © Enigmatry
