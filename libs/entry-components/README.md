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
you — sections 2, 3, 5, 8, 10, 11 and 12 in particular.

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
| `EntryFileInputComponent.selectedFile` | `EventEmitter<File \| FileList>` | `OutputEmitterRef<File \| FileList>` |
| `EntrySearchFilterComponent.searchFilterChange` | `EventEmitter<SearchFilterParams>` | `OutputEmitterRef<SearchFilterParams>` |
| `SearchFilterBase.formatValue` | `(value: T) => T` | `(value: unknown) => unknown` |
| `EntryTimePickerComponent.hours` / `.minutes` / `.seconds` / `.meridiem` | plain fields | signals — only reachable through a template ref, the class is not exported |

The search filter's own members are not in this table: it no longer exposes a form at all, and every
other member of it changed shape too. [Section 12](#12-the-search-filter-runs-on-signal-forms)
covers that component on its own.

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

All three outputs — `dateTimeChanged`, `EntryFileInputComponent.selectedFile` and
`EntrySearchFilterComponent.searchFilterChange` — are `OutputEmitterRef` now. `.subscribe()` still
works, but an `OutputEmitterRef` is not an `Observable`, so `.pipe()`, `.asObservable()` and
`.next()` are all gone:

```diff
- this.picker.dateTimeChanged.next(value);               // emit-only from inside the component now
- this.fileInput.selectedFile.pipe(debounceTime(200));   // no longer an Observable
+ this.picker.dateTimeChanged.subscribe(value => { ... });
+ outputToObservable(this.fileInput.selectedFile).pipe(debounceTime(200));
```

`outputToObservable` comes from `@angular/core/rxjs-interop`.

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

Both replacements **widen** what is accepted, so nothing breaks:

| Symbol | 21.x | 22.0.0 | Effect |
|---|---|---|---|
| `setServerSideValidationErrors(error, form)` | `UntypedFormGroup` | `AbstractControl` | widened |
| `EntryFormErrorsComponent.form` | `UntypedFormGroup` | `AbstractControl` | widened |

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

The search filter used to be the third entry here. It no longer has a reactive form of any kind —
see [section 12](#12-the-search-filter-runs-on-signal-forms).

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
- **`<entry-search-filter [searchFilters]>` follows the array instead of rebuilding from it.** `21.x`
  built the form once, so filters that arrived later — a select filter replaced once its options load
  — were never rendered. There is no build step at all now: a filter's value lives in the component's
  model, so a new key grows a field and a dropped key prunes one, and everything else keeps its value
  and its touched state. A filter you hand over carrying a new `value` wins; a rebind that changes no
  declared value leaves what the user typed alone. In-place mutation (`filters.push(...)`) still goes
  unnoticed: signal inputs compare by identity, so hand over a new array
  (`this.filters = [...this.filters, newFilter]`). See
  [section 12](#12-the-search-filter-runs-on-signal-forms) for the rest.
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

### 11. The date-time picker is a real form control, and two directives are gone

`EntryDateTimePickerComponent` implements
[`FormValueControl`](https://angular.dev/guide/forms/signals/custom-controls), so it owns a `value`
model signal and lets the forms API drive it. `21.x` did the opposite: it provided a no-op
`ControlValueAccessor` purely to satisfy Angular's requirement that a `[formControl]`-bound element
have an accessor, then used a second directive to reach around it, take the control the host was
really bound to, and write to it directly.

**`NoopControlValueAccessorDirective` and `NgControlAccessorDirective` are deleted** from
`@enigmatry/entry-components/common`. Nothing replaces them. If you applied either to a component of
your own for the same reason, drop both and give that component a `value = model<T>()` instead:

```diff
  @Component({
-   hostDirectives: [NoopControlValueAccessorDirective, NgControlAccessorDirective],
    ...
  })
- export class MyControl {
-   private readonly ngControlAccessor = inject(NgControlAccessorDirective);
-   get formControl(): FormControl<MyValue> {
-     return this.ngControlAccessor.control as FormControl<MyValue>;
-   }
- }
+ export class MyControl implements FormValueControl<MyValue> {
+   readonly value = model<MyValue>(…);
+ }
```

That contract is **not** signal-forms-only, and it needs no compatibility layer: reactive and
template-driven forms drive it natively, so `[formControl]`, `formControlName` and `[(ngModel)]`
carry on working and the same component also accepts `[formField]`. Do not implement
`ControlValueAccessor` alongside it — Angular takes the accessor path whenever one is present, and
the `value` model is then never written, with no compile error to tell you.

Every existing picker call site keeps working. Four things change:

- **`[disabled]` no longer disables the control you bound.** `21.x` reached into the bound control
  and called `disable()` on it, so `[disabled]="true"` beside a `[formControl]` disabled the
  consumer's control and left it disabled. The input now only disables the picker, and the forms API
  drives it from the field's own state. Disable the control instead
  (`myControl.disable()`), which is what the `disabled` input documentation already told you to do.
- **`formControl` is removed.** It was a getter handing back the control the host was bound to, which
  the picker no longer reaches for. Read and write `value` instead.
- **`calendarControl`, `is12HourClock`, `timePicker`, `minDate` and `maxDate` are now `protected`.**
  They are implementation detail, so reading any of them off a `@ViewChild` reference is a compile
  error. `calendarControl` in particular moved onto an internal object and is no longer a member at
  all.
- **`dateTimeChanged` and `valueChange` are not interchangeable — do not swap one for the other.**
  `valueChange` is the `value` model's own output and fires only for the picker's writes, so a user
  edit reaches it but `boundControl.setValue(…)` does not. `dateTimeChanged` fires for both and is
  the one to keep bound if you care about programmatic writes.
- **`dateTimeChanged` reports stabilized values.** It is driven off the value signal, so writes that
  land inside one tick collapse into a single emission of the value the tick ends on:
  `setValue(a); setValue(b)` emits once with `b`, and `a → b → a` emits once with `a` — the
  intermediate `b` never surfaces. `21.x` emitted every write, because it observed the bound
  control's `valueChanges` directly. Setting a control to the object reference it already holds also
  no longer emits. If you need per-write notification, subscribe to your own control's
  `valueChanges`.
- **`min` and `max` no longer accept a nullable type, and the schema owns them under `[formField]`.**
  They narrowed from `D | undefined` to `NonNullable<D> | undefined`, so under `strictTemplates` a
  binding typed `Date | null` no longer compiles — narrow it at the call site. Reactive forms do not
  bind these, so an explicit `[min]`/`[max]` is still yours to set there; signal forms do, so under
  `[formField]` they come from the field's `min`/`max` validators and an explicit binding is
  overwritten.

**Known limitation — unparseable text no longer invalidates the control you bound.** The picker holds
its own control behind the visible field now, so Material raises `matDatepickerParse` there instead
of on yours. In `21.x` the visible input was bound straight to your control, so typing text Material
could not read left it invalid and blocked submission; now an optional field reports valid and empty
while the bad text is still on screen. The form field still shows its error state, so this is visible
rather than silent, but it does not stop a submit.

The cheap route is closed and the supported one is deferred. `NG_VALIDATORS` is not it: a custom
control's validators are composed only through `setUpControlValueAccessor`, which the custom-control
path deliberately skips, so a `FormValueControl` cannot contribute its own errors in either reactive
or signal forms. The supported public channel is
[`transformedValue`](https://angular.dev/guide/forms/signals/custom-controls#reporting-parse-errors),
which has the control own the raw text and report its own parse errors — a larger change than it
looks, because taking the parsing off `MatDatepickerInput` also takes away the control the form field
reads its error state from. It is not in this release.

Until it is, **a consumer cannot tell unparseable text from a legitimately empty field** — the value
is `null` either way, so a validator of your own has nothing to key on. Two things do block a submit:
**make the field required**, which rejects the `null` that a failed parse produces (the message will
say required rather than naming the bad date), or read the input's raw text yourself.

`reset()` is what clears the bad text. Setting a control's value cannot: Material reformats its input
only when the new value differs by reference, so resetting an already-empty field leaves the text on
screen. `field().reset()` calls the picker's `reset()` and clears both the text and the error; a
reactive `control.reset()` does not reach it.

### 12. The search filter runs on signal forms

`<entry-search-filter>` is rewritten on [signal forms](https://angular.dev/guide/forms/signals).
Every member below is measured against **21.4.0**, not against `master` — two of these had already
changed once in unreleased work, so a diff against the previous tag is the only honest baseline.

The filter models are now configuration and nothing else. They hold no control, and the component
never writes back onto them.

| Symbol | 21.4.0 | 22.0.0 |
|---|---|---|
| `EntrySearchFilterComponent.searchAction` | — | **new, required**: `(values) => Promise<SearchFilterServerError[] \| void>` |
| `EntrySearchFilterComponent.searchFilterChange` | `EventEmitter<SearchFilterParams>` | `OutputEmitterRef<SearchFilterParams>`, still emitted on every accepted search |
| `EntrySearchFilterComponent.searchFilterForm` | `UntypedFormGroup` | **gone** — there is no reactive form |
| `EntrySearchFilterComponent.renderedSearchFilters` | — | **gone** — it only ever existed on unreleased `master` |
| `EntrySearchFilterComponent.toFormGroup` | `(filters) => UntypedFormGroup` | **gone** |
| `EntrySearchFilterComponent.onSubmit` | callable member | **gone** — the form submits itself |
| `EntrySearchFilterComponent.controlType` / `config` / `as*SearchFilter` | public | `protected` — template-only members |
| `SearchFilterBase.formControl` | `FormControl<T \| undefined>` | **gone** |
| `SearchFilterBase.setValue(value)` | method | **gone** — hand over new filters instead |
| `SearchFilterBase.toFormControl()` | method | **gone** |
| `SearchFilterBase.required` | — | **new**: `boolean`, default `false` |
| `SearchFilterBase.type` | defaulted to `'text-input'` | defaults to `'text'` |
| `SelectSearchFilter.options` | `SelectOption<T>[]` | `Signal<readonly SelectOption<T>[]>` — a plain array is still accepted and wrapped |
| `SelectSearchFilter.options$` | `Observable<SelectOption<T>[]>` | **gone** — pass a signal to `options` |
| `SelectSearchFilter.showNoneOption` | documented `true`, behaved as `false` | `true`, as documented |
| `AutocompleteSearchFilter.search` | `(input) => Observable<SelectOption<T>[]>` | `(input, abortSignal) => Promise<readonly SelectOption<T>[]>` |
| `AutocompleteSearchFilter.resolveLabel` | — | **new**, optional: resolves the label for a value the user did not pick |
| `AutocompleteSearchFilter` value | the whole `SelectOption<T>` | the option's `key` |
| `EntrySearchFilterConfig.clearButtonText` / `.requiredMessage` / `.maxLengthMessage` | — | **new** |

#### Running the search

The component asks you for the search rather than announcing it. Give it an action; return whatever
the server rejected and Angular puts each message on its filter, clearing it when that filter is
edited. That replaces `setServerSideValidationErrors` on this form — the filter form no longer has an
`AbstractControl` to hand it.

```diff
- <entry-search-filter [searchFilters]="filters" (searchFilterChange)="onFilter($event)">
+ <entry-search-filter [searchFilters]="filters" [searchAction]="search">
```

```diff
- onFilter(params: SearchFilterParams): void {
-   this.service.getUsers(params).subscribe({
-     next: users => this.users.set(users),
-     error: (problem: IValidationProblemDetails) =>
-       setServerSideValidationErrors(problem, this.searchFilter().searchFilterForm())
-   });
- }
+ readonly search = async(params: SearchFilterParams) => {
+   try {
+     this.users.set(await firstValueFrom(this.service.getUsers(params)));
+     return undefined;
+   } catch (problem) {
+     return Object.entries((problem as IValidationProblemDetails).errors ?? {})
+       .flatMap(([key, messages]) => messages.map(message => ({ key, message })));
+   }
+ };
```

`searchFilterChange` still fires, so a page that writes the filters into the URL and fetches
downstream of navigation can keep binding it and hand the action an empty implementation.

#### Setting a filter's value

`setValue` is gone because there is no control to set. Hand over new filter instances instead — the
component keeps what the user typed unless the filter's declared `value` changed:

```diff
- this.filters.find(filter => filter.key === 'name')!.setValue(params['name']);
+ this.filters = this.createFilters(params);   // fresh instances carrying the new values
```

#### Validation and submission

Filters can be validated for the first time. `required: true` on a filter, and the `maxLength` that
was previously only a DOM attribute, are now real rules. **An invalid filter blocks the search** and
focus moves to the offending field — `21.x` searched regardless, because nothing could be invalid.

A message the server returned keeps its filter invalid until the user edits that filter, so the next
search is blocked too. That is deliberate: the server rejected that value and nothing else has
happened to change its mind.

#### Clearing

There is a Clear button now, labelled through `EntrySearchFilterConfig.clearButtonText`. It empties
every filter and forgets which were touched. It clears rather than restoring declared values, so a
filter that carries a default loses it until you hand the filters over again.

#### What this cost, for anyone doing the same migration

Two things have no documented Angular idiom, and both are worth knowing before you copy this:

- **A library component taking the submit action from its consumer.** Angular's
  [dynamic forms guide](https://angular.dev/guide/forms/signals/dynamic-forms-with-json) only shows
  an application component owning its own action. The required-action input is ours.
- **Per-key *and* per-type rules over a runtime key set.** `applyEach` reaches keys created after
  `form()` ran, but a length rule cannot be typed against a heterogeneous leaf, so the value is
  narrowed with `applyWhenValue` first — and that narrowing re-roots the path, so the key has to come
  from `context.pathKeys()` rather than `context.key()`. The guide's config loop with scoped
  `SchemaPath<T>` casts assumes the config is fixed when the form is created; ours is not.

Three smaller traps, all measured:

- A model value of `undefined` gets **no field at all**, and writing `undefined` into a live field
  destroys its node along with its touched state and any server message. Text filters seed `''` and
  everything else seeds `null`.
- Indexing a field tree with a key that is also a `Function` member — `name`, `length`, `call` —
  type-checks as that member instead of a field. Runtime is fine; the compiler lies. Reach every
  field through a typed accessor.
- Iterating a field tree inside a `computed()` registers no dependency on its **key set**: adding a
  key leaves the computed stale, while removing one invalidates it. Read the model signal first.

## License

Apache-2 © Enigmatry
