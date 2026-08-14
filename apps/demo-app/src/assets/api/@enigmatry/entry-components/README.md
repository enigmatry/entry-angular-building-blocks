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

### 5. Inputs, outputs and view queries are signals

Every component and directive in the library moved from `@Input()` / `@Output()` / `@ViewChild()` to
`input()` / `output()` / `viewChild()`.

**Templates are unaffected.** `<entry-file-input [multiple]="true" [label]="'Pick'">` keeps working
exactly as before, including the attribute coercion on `multiple`, `disabled` and `readonly`.

What changes is **reading those members from TypeScript** — typically off a `@ViewChild`
reference. They are signals now, so they have to be called:

```diff
  private readonly fileInput = viewChild.required(EntryFileInputComponent);

- const name = this.fileInput().value?.name;
+ const name = this.fileInput().value()?.name;
- if (this.fileInput().multiple) { ... }
+ if (this.fileInput().multiple()) { ... }
```

Reading a signal without calling it yields the signal function rather than the value. That is not a
compile error in a boolean or template-literal position, so it fails quietly — grep for imperative
reads of library inputs rather than relying on the compiler.

The library also no longer implements `ngOnInit` / `ngAfterViewInit` / `ngOnDestroy` on any
component. If you subclassed one and called `super.ngOnInit()`, drop the call — the work now happens
in a constructor, an `afterNextRender` callback or a `linkedSignal`.

### 6. Renamed and reshaped members

| Symbol | 21.x | 22.0.0 |
|---|---|---|
| `EntryDateTimePickerComponent.dateTimeChanged` | `Subject<D>` | `OutputEmitterRef<D>` |
| `EntryDialogComponent.confirm` | callable member | `confirmAction` input, bound as `[confirm]` |
| `EntryDialogComponent.cancel` | callable member | `cancelAction` input, bound as `[cancel]` |
| `EntryFileInputComponent.value` | `File \| FileList \| undefined` | `Signal<...>` (read-only) |
| `EntryFileInputComponent.fileNames` | getter | `Signal<string>` |
| `EntryTimePickerComponent.hours` / `.minutes` / `.seconds` / `.meridiem` | plain fields | signals — only reachable through a template ref, the class is not exported |
| `NgControlAccessorDirective.control` | writable field | read-only getter |

`dateTimeChanged` still supports `.subscribe()`, but `.next()` is gone — an `OutputEmitterRef` is
emit-only from the component that owns it:

```diff
- this.picker.dateTimeChanged.next(value);   // no longer available
+ // let the component emit; subscribe instead of pushing
  this.picker.dateTimeChanged.subscribe(value => { ... });
```

The dialog callbacks are the one break with no compile-time signal if you only use the class from a
template, and the one most likely to bite a subclass:

```diff
  export class MyDialog extends EntryDialogComponent {
    onDismiss(): void {
-     this.cancel();          // returned the callback instead of invoking it
+     this.cancelAction()();  // or simply this.onCancel()
    }
  }
```

### 7. `EntryFileInputComponent.disabled` no longer reports the effective state

`disabled` used to be a getter that reflected both the `[disabled]` binding **and** the forms API
(`setDisabledState`, i.e. `formControl.disable()`). It is now the bound input only; the combined
state moved to `effectiveDisabled`.

```diff
- if (this.fileInput().disabled) { ... }          // false after formControl.disable()
+ if (this.fileInput().effectiveDisabled()) { ... }
```

This one is silent, and worse than a stale value. Per section 5 `disabled` is now a signal, so the
expression above does not return "the old boolean" — it returns the signal *function*, which is
always truthy. An upload gate written that way inverts to permanently disabled:

```ts
// always true in 22.0.0, whatever the state
if (this.fileInput().disabled) { … }
```

### 8. Required inputs fail earlier and more clearly

`<entry-form-errors [form]>` and `[entryDisplayControlValidation] [control]` are declared with
`input.required()`. **Nothing that previously worked breaks here** — leaving either unbound was
already a crash, just a worse one: `form` threw `Cannot read properties of undefined (reading
'errors')` from inside the component's template, and `control` threw from its `ngOnInit`.

What changes is *when* you find out. With `strictTemplates` — which this workspace enables and most
consumers inherit — omitting the binding is now `NG8008` at build time rather than a runtime
`TypeError`. Without it, you get `NG0950` naming the missing input on first read.

Binding a value that is legitimately absent at first render is also safe now, where the old template
crashed on it — though under `strictTemplates` the bound type still has to permit it:

```ts
// the input accepts undefined at runtime; widen the field so the template type-checks
protected form: UntypedFormGroup | undefined;
```

Both `entry-form-errors` and `entryDisplayControlValidation` render nothing until a real
form or control arrives, and recover on their own once it does.

## License

Apache-2 © Enigmatry

## Modules

- [button/public-api](button/public-api.md)
- [dialog/public-api](dialog/public-api.md)
- [search-filter/public-api](search-filter/public-api.md)
- [validation/public-api](validation/public-api.md)
