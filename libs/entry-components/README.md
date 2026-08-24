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

## Rendering targets

This library is **browser-only**. It is not tested under server-side rendering or prerendering, and
several components will not work there: they attach DOM event listeners, read `document`, and build
CDK overlays from `afterNextRender` callbacks, which a server renderer never runs. Do not put these
components on a prerendered route.

## Migrating to 22.x

`22.x` requires Angular 22, TypeScript ~6.0 and Node `^22.22.3 || ^24.15.0 || >=26.0.0`. Run
`ng update @angular/core@22 @angular/cli@22 @angular/cdk@22 @angular/material@22` first, then work
through the items below. Several of them change behaviour silently, with no compile error to catch
you — sections 2, 3, 5, 8 and 10 in particular.

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
| `EntrySearchFilterComponent.searchFilterForm` | `UntypedFormGroup` | `Signal<FormRecord>` |
| `EntrySearchFilterComponent.renderedSearchFilters` | array property | `Signal<SearchFilterBase<unknown>[]>` |
| `SearchFilterBase.formatValue` | `(value: T) => T` | `(value: unknown) => unknown` |
| `EntryTimePickerComponent.hours` / `.minutes` / `.seconds` / `.meridiem` | plain fields | signals — only reachable through a template ref, the class is not exported |
| `NgControlAccessorDirective.control` | writable `UntypedFormControl` field | read-only `AbstractControl` getter |

`searchFilterForm` is the one most likely to be read imperatively, because that is how server-side
validation errors get onto the filter form:

```diff
- setServerSideValidationErrors(error, this.searchFilter.searchFilterForm);
+ setServerSideValidationErrors(error, this.searchFilter().searchFilterForm());
```

`renderedSearchFilters` follows the same shape — it is now a signal, so it has to be called before
iterating:

```diff
- this.searchFilter.renderedSearchFilters.map(filter => filter.key);
+ this.searchFilter().renderedSearchFilters().map(filter => filter.key);
```

`formatValue` is the one signature change with a compile error at the *consumer's* callback rather
than at the call site. It takes `unknown` so that `SearchFilterBase<T>` is assignable to
`SearchFilterBase<unknown>` — it was the only member putting `T` in a function-parameter position on
a property, and under `strictFunctionTypes` that made the class contravariant, which is why the
filter arrays were typed `SearchFilterBase<any>`. Narrow inside the callback:

```diff
  new TextSearchFilter({
    key: 'score',
-   formatValue: (value: string) => value.replace(/[^0-9.]/gu, '')
+   formatValue: (value: unknown) => String(value ?? '').replace(/[^0-9.]/gu, '')
  })
```

The filter arrays themselves are `SearchFilterBase<unknown>[]` now, so `[searchFilters]` and any
field you keep them in can drop their `any`.

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

### 7. No more `UntypedFormGroup` / `UntypedFormControl`

Every `Untyped*` type is gone from the library's public surface. Those aliases were only ever an
`ng update` migration aid from Angular 13 — `UntypedFormGroup` is literally `FormGroup<any>`, so
they opted every form touching this library out of typed forms.

Two of the three replacements **widen** what is accepted, so nothing breaks:

| Symbol | 21.x | 22.0.0 | Effect |
|---|---|---|---|
| `setServerSideValidationErrors(error, form)` | `UntypedFormGroup` | `AbstractControl` | widened |
| `EntryFormErrorsComponent.form` | `UntypedFormGroup` | `AbstractControl` | widened |
| `EntrySearchFilterComponent.searchFilterForm` | `UntypedFormGroup` | `FormRecord` | see below |
| `NgControlAccessorDirective.control` | `UntypedFormControl` | `AbstractControl` | narrowed |

You can now pass a **typed** form where you previously had to widen to `UntypedFormGroup`:

```diff
- form: UntypedFormGroup = this.formBuilder.group({ firstName: [''], lastName: [''] });
+ form = this.formBuilder.group({
+   firstName: new FormControl('', [Validators.required]),
+   lastName: new FormControl('', [Validators.required])
+ });
  ...
  setServerSideValidationErrors(error, this.form);   // still compiles, now fully typed
```

`searchFilterForm` is a [`FormRecord`](https://angular.dev/api/forms/FormRecord) — a `FormGroup`
whose keys are not known at compile time, which is exactly what a filter set is. `FormRecord`
extends `FormGroup` at runtime, so `instanceof` checks and every method behave identically.

`NgControlAccessorDirective.control` is the one narrowing. It hands back `AbstractControl` because a
directive takes no type arguments from the element it sits on, so it genuinely cannot know the value
type. If you need `FormControl`-only members (`defaultValue`, `registerOnChange`), cast at the point
of use, where the type *is* known:

```ts
get formControl(): FormControl<MyValue> {
  return this.ngControlAccessor.control as FormControl<MyValue>;
}
```

`@enigmatry/entry-form` still surfaces `UntypedFormControl` in places, because that is how
`@ngx-formly/core` types `FieldType.formControl`. That one is not ours to remove.

### 8. `EntryFileInputComponent.disabled` no longer reports the effective state

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

### 9. Required inputs fail earlier and more clearly

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

### 10. Fixed, but behaviour-changing

Several long-standing bugs are fixed in this release. None is a compile error, so all are worth a
look if you rely on the affected components:

- **`<entry-dialog [disableConfirm]>` now actually disables the confirm button.** The input existed
  in `21.x` but was never bound to anything, so a wrong expression had no visible effect. If yours
  was wrong, the dialog will now refuse to confirm.
- **The time picker no longer stamps the current second onto a committed value.** `21.x` fell back
  to `getSeconds(defaultTime ?? now)` whenever seconds were not selectable, so two users applying
  the same visible time produced different values. Seconds now come from the bound date when they
  are shown, from an explicit `defaultTime` when one is given, and are `0` otherwise.
- **`<entry-search-filter [searchFilters]>` rebuilds when the array changes.** `21.x` built the form
  once, so filters that arrived later — a select filter replaced once its options load — were never
  rendered and never had their `formControl` assigned. Every new array now rebuilds, and the values
  already in the form are carried over by key so nothing the user typed is lost. In-place mutation
  (`filters.push(...)`) still does not rebuild: signal inputs compare by identity, so hand over a new
  array (`this.filters = [...this.filters, newFilter]`).
- **`[entryDisplayControlValidation]` now clears its message when the control stops being invalid.**
  `21.x` only ever wrote the text, so a message survived the field being corrected. If you relied on
  the message staying put, it no longer does.
- **The permission directives deny by default.** `[entryPermissionsOnly]="user()?.permissions"` while
  a profile loads binds `undefined`, which now reads as "nothing to check against" and hides the
  host. `21.x` threw from inside the input setter and left the element visible. Bind an empty array
  where you genuinely mean "no restriction".

  The directives also evaluate both aliases when both are bound — the host is shown only when
  `entryPermissionsOnly` is held and `entryPermissionsExcept` is not. In `21.x` whichever setter ran
  last decided the result.

## License

Apache-2 © Enigmatry
