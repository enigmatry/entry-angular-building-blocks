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
| `EntryDialogComponent.confirm` / `.cancel` | callable members | `(confirmed)` / `(canceled)` outputs — see [section 12](#12-dialogs-close-themselves-with-a-typed-result) |
| `EntryFileInputComponent.value` | `File \| FileList \| undefined` | `ModelSignal<FileInputValue>` — see [section 8](#8-the-file-input-is-a-real-form-control) |
| `EntryFileInputComponent.fileNames` | getter | `protected` — see [section 8](#8-the-file-input-is-a-real-form-control) |
| `EntryFileInputComponent.selectedFile` | `EventEmitter<File \| FileList>` | `OutputEmitterRef<File \| FileList>` |
| `EntrySearchFilterComponent.searchFilterChange` | `EventEmitter<SearchFilterParams>` | `OutputEmitterRef<SearchFilterParams>` |
| `SearchFilterBase.formatValue` | `(value: T) => T` | `(value: unknown) => unknown` |
| `EntryTimePickerComponent.hours` / `.minutes` / `.seconds` / `.meridiem` | plain fields | signals — only reachable through a template ref, the class is not exported |

The search filter's own members are not in this table: it no longer exposes a form at all, and every
other member of it changed shape too. [Section 13](#13-the-search-filter-runs-on-signal-forms)
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
see [section 13](#13-the-search-filter-runs-on-signal-forms).

`@enigmatry/entry-form` still surfaces `UntypedFormControl` in places, because that is how
`@ngx-formly/core` types `FieldType.formControl`. That one is not ours to remove.

### 8. The file input is a real form control

`EntryFileInputComponent` implements
[`FormValueControl`](https://angular.dev/guide/forms/signals/custom-controls), the same contract the
date-time picker moved to, so it owns a `value` model signal and lets the forms API drive it. Its
`ControlValueAccessor` and its `Validator` are gone, along with `NG_VALUE_ACCESSOR` and
`NG_VALIDATORS`.

`[formControl]`, `formControlName` and `[(ngModel)]` all keep working — reactive and template-driven
forms drive that contract natively, though validator directives on the element and
`updateOn: 'submit'` no longer apply (see below) — and the component now also accepts `[formField]`. Without a
form, `[(value)]` binds the selection directly. Do not give it a `ControlValueAccessor` again:
Angular takes the accessor path whenever one is present, and the `value` model is then never
written. [Section 11](#11-the-date-time-picker-is-a-real-form-control-and-two-directives-are-gone)
has the rest of the contract.

The two interfaces took their members with them, and what is left of the internals was narrowed
while the class was open:

| Symbol | 21.x | 22.0.0 |
|---|---|---|
| `writeValue` / `registerOnChange` / `registerOnTouched` / `setDisabledState` | `ControlValueAccessor` | **gone** |
| `onChange` / `onTouched` | callbacks the forms API registered | **gone** |
| `validate` | `Validator` | **gone** — see below |
| `maxFileSizeInKb` / `maxFileCount` | inputs | **gone** — see below |
| `fileNames` / `onFileSelect` | public | `protected` — template-only members |
| `_fileButton` / `_fileInput` | public `@ViewChild` fields | **gone** — the element references are private now |

`value` was a plain field in `21.x` and is a `ModelSignal` now, so assigning to it no longer
compiles: `value.set(…)` is the supported way to set the selection from outside. Its empty is `null` rather than `undefined` —
`FileInputValue` is `File | FileList | null`, because a signal form's model may not contain
`undefined` — so a field or control you declare wants `null` as its initial value. Retype the ones
you have: a control or `[(ngModel)]` property declared `File | undefined` keeps compiling and then
takes a `null` at runtime, from `clear()` or from an empty selection. Change emptiness checks written
as `=== undefined` too: TypeScript does not flag them, and a gate such as `selectedFile === undefined`
stays `false` once the empty is `null`. `clear()` still
empties the selection, `reset()` is new and returns the element to its pristine state (it is what
`field().reset()` calls), and `focus()` is new so that `focusBoundControl()` reaches the button.

#### The size and count limits moved out of the component

A custom control cannot report its own errors. Its validators are composed only through
`setUpControlValueAccessor`, which the custom-control path deliberately skips, and signal forms
expects validation to come from the schema. So `maxFileSizeInKb` and `maxFileCount` are gone as
inputs, and the same two limits ship as rules for the control you own:

```diff
- <entry-file-input formControlName="image" multiple="true" [maxFileSizeInKb]="100" [maxFileCount]="2" />
+ <entry-file-input formControlName="image" multiple="true" />
```

```diff
+ import { maxFileCountValidator, maxFileSizeValidator } from '@enigmatry/entry-components/file-input';
...
- image: new FormControl<File | undefined>(undefined, { validators: [Validators.required] })
+ image: new FormControl<FileInputValue>(null, {
+   validators: [Validators.required, maxFileSizeValidator(100), maxFileCountValidator(2)]
+ })
```

The error keys are unchanged — `maxFileSize` and `maxFileCount`, reported for the same selections as
before for any positive limit — so configured validation messages keep matching. A limit of `0` is the
exception: `21.x` treated it as no limit, while the validators enforce it — `0` files rejects every
selection and `0` KB every non-empty file — so
leave the validator off rather than passing `0`. For a signal form the same limits are
schema rules, and they carry a message of their own:

```ts
import { maxFileCount, maxFileSize } from '@enigmatry/entry-components/file-input';

readonly uploadForm = form(this.uploadModel, path => {
  maxFileSize(path.attachments, 100, { message: 'Every file has to be 100 KB or smaller.' });
  maxFileCount(path.attachments, 2, { message: 'Select at most two files.' });
});
```

Do not count on the compiler to find the two removed inputs. A bound `[maxFileSizeInKb]` or
`[maxFileCount]` is usually `NG8002`, but a plain attribute (`maxFileCount="2"`), a module or
component with `NO_ERRORS_SCHEMA` or `CUSTOM_ELEMENTS_SCHEMA`, and — with `strictTemplates` off — a
binding inside `@if`, `@for` or an `<ng-template>` all compile cleanly, and the limit simply stops
being enforced. Grep your templates for `maxFileSizeInKb` and `maxFileCount` either way.

**Validator directives on the element stop applying, whatever the binding — this is the silent
part.** Angular composes validators only in `setUpControlValueAccessor`, so on a custom control it
composes none at all. A validator *directive* on the element no longer reaches the control, in
reactive forms as much as template-driven ones, and that includes Angular's own:

```html
<!-- 21.x: invalid while empty. 22.0.0: valid while empty; the file input warns in dev mode -->
<entry-file-input required [(ngModel)]="file" name="file" />
<entry-file-input required formControlName="image" />
```

The same is true of the date-time picker and of any custom control you write. Put the rule on the
control (`Validators.required`) or on the signal form's schema instead. A validator directive of your
own will not work either — there is no composition step left for it to join. In dev mode the file
input logs a console warning when it finds a validator directive on its element; the picker does not.

#### Four behaviour changes beyond the contract

- **`updateOn: 'submit'` is ignored.** Set on the control, its group or form, or through
  `ngModelOptions`, it no longer holds a selection back: the value, dirty, touched and validation
  update as soon as a file is picked, where `21.x` waited for submit. Angular applies a custom
  control's value directly; [angular/angular#70735](https://github.com/angular/angular/pull/70735)
  fixes that upstream. `'blur'` changes nothing here, because `21.x` committed on selection too.
- **Blur now marks the control touched.** `21.x` marked it only on a selection, so tabbing past an
  empty required field now shows its error.
- **A value the element did not produce now clears it.** `21.x` left the files on the native input
  whenever the bound control was reset or written to, so the element held files the form did not
  have — and because the browser raises no `change` when the user picks one of those again, that
  selection could not be restored at all. The component now remembers the value it handed over and
  empties the element for every other write; `reset()` does the same on demand. Note that
  `control.reset(control.value)` is not one of those writes: the value does not change, so the
  element still matches it and is left alone. Nor is a write back to the previous value before the
  next change detection — a `control.reset()` or `setValue(null)` inside `(selectedFile)` or a
  synchronous `valueChanges` subscriber — because Angular never passes it to a custom control, and the
  file name stays on screen. Discard such a selection with the component's `clear()`, followed by
  `control.reset()` if pristine matters.
- **A `FileList` value is a copy now, and outlives the element.** The value used to be the
  element's own list, which the browser empties in place when the input is cleared — so a list you
  had captured from `selectedFile` went to zero length behind your back the moment anything called
  `clear()`. The component hands over a detached copy instead. Single `File` values were never
  affected.

`[disabled]` beside a bound control behaves as it did in `21.x`: the binding and the forms API write
the same input and the last write wins — the forms API at setup and whenever the control is disabled
or enabled, the binding whenever its value changes. In a reactive form, disable the control
(`myControl.disable()`); with `[(ngModel)]`, `[disabled]` goes through the control and stays the way
to do it. `disabled` is a signal now, per section 5, so an imperative read is
`this.fileInput().disabled()`.

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
  was wrong, the dialog will now refuse to confirm. A disabled confirm button stays focusable
  (`aria-disabled`) and ignores clicks and Enter.
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
  [section 13](#13-the-search-filter-runs-on-signal-forms) for the rest.
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
- **Server-side errors on disabled controls now show at form level.** `setServerSideValidationErrors`
  put them on the disabled control in `21.x`, where Angular never reports them as invalid, so the
  message appeared nowhere. They now land in `<entry-form-errors>`, as do errors for controls inside
  a disabled group or array. If your app wraps the helper to work around this, remove the wrapper —
  otherwise the message may show twice.

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

Existing picker call sites change in these ways:

- **Validator directives on the element stop applying.** `21.x` provided an accessor, so a `required`
  beside `formControlName` or `[(ngModel)]` reached the control; now it does not, whatever the binding
  — see [section 8](#8-the-file-input-is-a-real-form-control). Put the rule on the control or the
  schema.
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

### 12. Dialogs close themselves, with a typed result

`<entry-dialog>` no longer takes its confirm and cancel behaviour as function inputs, and dialog
components no longer extend `EntryDialogComponent`. A dialog component renders `<entry-dialog>`,
listens to its outputs and closes itself through a typed handle:

```diff
  @Component({
-   template: `<entry-dialog title="Rename" [confirm]="rename"> … </entry-dialog>`
+   template: `<entry-dialog title="Rename" (confirmed)="dialog.close(name())"> … </entry-dialog>`
  })
- export class RenameDialog extends EntryDialogComponent {
-   readonly data: RenameData = inject(MAT_DIALOG_DATA);
-   name = this.data.name;
-   rename = () => of(this.name);
+ export class RenameDialog {
+   readonly dialog = injectEntryDialog<RenameData, string>();
+   protected readonly name = signal(this.dialog.data.name);
  }
```

- **The `confirm` and `cancel` inputs are gone; bind `(confirmed)` and `(canceled)`.** A leftover
  `[confirm]` or `[cancel]` binding is a compile error under `strictTemplates`. `(confirmed)` only
  notifies: call `dialog.close(result)` when you are done, so a save that fails can leave the dialog
  open. `(canceled)` is emitted by the cancel and close buttons, after which the dialog closes with
  `undefined` unless the handler already closed it; close synchronously to return a value of your own.
- **The confirm button no longer closes the dialog by itself, and nothing tells you at compile
  time.** A dialog that relied on the default confirm button closing with `true` stays open until it
  binds `(confirmed)="dialog.close(true)"`. Look for every `<entry-dialog>` that renders the default
  buttons (no `hideButtons`, no `buttonsTemplate`) and has no `(confirmed)` binding.
- **Cancel and the close button close with `undefined`, not `false`.** That matches Escape and
  backdrop clicks, so `undefined` always means "dismissed". The built-in confirm dialog still returns
  `false` for both.
- **Read the data and close through the handle.** `inject(MAT_DIALOG_DATA)` becomes `dialog.data`,
  and `this.close(x)` or `this.mdDialogRef.close(x)` becomes `dialog.close(x)`. The handle has to be a
  public field named `dialog`: `EntryDialogService.open()` reads the data and result types from it,
  so `open(RenameDialog, { name })` returns `Observable<string | undefined>` and rejects data of the
  wrong shape. Data is required unless the dialog's data type accepts `undefined`, and
  `injectEntryDialog()` without type arguments is `EntryDialog<void, boolean>`. Once the dialog has
  started closing, further `dialog.close()` calls and button presses are ignored, so the first close
  wins.
- **`dialog.submit()` keeps the confirm button disabled while saving.** It holds `dialog.submitting()`
  true until the work you pass settles and ignores repeated calls; bind
  `[disableConfirm]="dialog.submitting()"`.
- **The cancel button no longer submits a form around the dialog.** In `21.x` neither default button
  had a `type`, so inside a `<form>` both submitted it. The confirm button is still a submit button,
  so a dialog component that wraps `<entry-dialog>` in its own `<form [formGroup]>` still confirms on
  Enter, but cancel is now `type="button"`. Save such a dialog from the form's `(ngSubmit)`, not
  `(confirmed)`: `(confirmed)` fires on the click, before the form commits controls that update on
  `submit`.
- **The built-in dialogs' data types lost the `I` prefix and the `Partial`.** `IEntryAlertDialogData`,
  `IEntryConfirmDialogData` and `IEntryErrorDialogData` are now `EntryAlertDialogData`,
  `EntryConfirmDialogData` and `EntryErrorDialogData`. `openAlert`, `openConfirm` and `openError`
  require `title` and `message` (`message` is optional for errors and renders above the error list),
  and they no longer write `disableClose` back into the object you pass.
- **The built-in dialog components no longer extend `EntryDialogComponent`.**
  `EntryAlertDialogComponent`, `EntryConfirmDialogComponent` and `EntryErrorDialogComponent` expose
  their data as `dialog.data` instead of `data`, their `config` and the error dialog's `errors` are
  now `protected`, and they no longer carry the `<entry-dialog>` inputs, `close` or `onSubmit`.
- **Smaller changes:** the title is an `<h2 mat-dialog-title>`; the inner `role="dialog"` is gone,
  since `mat-dialog-container` already carries it; the close button's accessible label comes from
  `EntryDialogConfig.closeButtonLabel` (default `'Close dialog'`) instead of being hard-coded;
  `buttonsTemplate` is typed `TemplateRef<unknown>`; and `EntryDialogComponent` no longer has
  `close` or `onSubmit`.

### 13. The search filter runs on signal forms

`<entry-search-filter>` is rewritten on [signal forms](https://angular.dev/guide/forms/signals).
Every member below is measured against **21.4.0**, not against `master` — two of these had already
changed once in unreleased work, so a diff against the previous tag is the only honest baseline.

The filter models are now configuration and nothing else. They hold no control, and the component
never writes back onto them.

| Symbol | 21.4.0 | 22.0.0 |
|---|---|---|
| `EntrySearchFilterComponent.searchAction` | — | **new, required**: `(values) => Promise<SearchFilterServerError[] \| void>` |
| `EntrySearchFilterComponent.searchFilterChange` | `EventEmitter<SearchFilterParams>` | `OutputEmitterRef<SearchFilterParams>`, still emitted on every accepted search |
| `EntrySearchFilterComponent.reset(values?)` | — | **new**: puts each filter back to the value given for its key, else to the one it declares |
| `EntrySearchFilterComponent.searchFilterForm` | `UntypedFormGroup` | **gone** — there is no reactive form |
| `EntrySearchFilterComponent.renderedSearchFilters` | — | **gone** — `protected` now, and it only ever existed on unreleased `master` |
| `EntrySearchFilterComponent.toFormGroup` | `(filters) => UntypedFormGroup` | **gone** |
| `EntrySearchFilterComponent.onSubmit` | callable member | **gone** — the form submits itself |
| `EntrySearchFilterComponent.controlType` / `config` / `as*SearchFilter` | public | `protected` — template-only members |
| `SearchFilterBase.formControl` | `FormControl<T \| undefined>` | **gone** |
| `SearchFilterBase.setValue(value)` | method | **gone** — hand over new filters instead |
| `SearchFilterBase.toFormControl()` | method | **gone** |
| `SearchFilterBase.required` | — | **new**: `boolean`, default `false` |
| `SearchFilterBase.type` | defaulted to `'text-input'` | defaults to `'text'` |
| `SearchFilterBase.formatValue` | ran on every filter's value changes, `setValue` included | text filters only, on what the user types |
| `SelectSearchFilter.options` | `SelectOption<T>[]` | `Signal<readonly SelectOption<T>[]>` — a plain array is still accepted and wrapped |
| `SelectSearchFilter.options$` | `Observable<SelectOption<T>[]>` | **gone** — pass a signal to `options` |
| `SelectSearchFilter.showNoneOption` | documented `true`, behaved as `false` | `true`, as documented |
| `AutocompleteSearchFilter.search` | `(input) => Observable<SelectOption<T>[]>` | `(input, abortSignal) => Promise<readonly SelectOption<T>[]>` |
| `AutocompleteSearchFilter.resolveLabel` | — | **new**, optional: resolves the label for a value the user did not pick |
| `AutocompleteSearchFilter` value | the whole `SelectOption<T>` | the option's `key` |
| `EntrySearchFilterConfig.clearButtonText` / `.requiredMessage` / `.maxLengthMessage` / `.invalidDateMessage` | — | **new** |
| `SearchFilterParams`, an empty filter's value | `undefined` | `''` for a text filter, `[]` for a multi-select, `null` for the rest |

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
+   } catch (error) {
+     if (!isValidationProblem(error)) {
+       this.snackBar.open('The search failed. Try again.');
+       return undefined;
+     }
+     return Object.entries(error.errors ?? {})
+       .flatMap(([key, messages]) => messages.map(message => ({ key, message })));
+   }
+ };
```

`isValidationProblem` stands for whatever narrows the error to `IValidationProblemDetails` in your
application. Return messages only for what the server rejected: a message for a network failure or a
server fault would stand on the form like any other and block the retry, so report those yourself.

`searchFilterChange` still fires, so a page that writes the filters into the URL and fetches
downstream of navigation can keep binding it and hand the action an empty implementation.

`searchAction` and `searchFilterChange` each get their own copy of the values, so adding, removing or
replacing a key leaves the form alone. Arrays and dates inside are the form's own: replace them, never
mutate them in place.

Every bound filter was always a key in those params. What changed is what an untouched one holds:
`''`, `[]` or `null` where `21.4.0` put `undefined`. A guard that tested only for `undefined` now
lets empty filters through, so a page that writes them into the URL gains empty query parameters,
and a backend reading a present-but-empty value as "match the empty string" returns nothing:

```ts
const isEmptySearchValue = (value: unknown): boolean =>
  value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
```

```diff
  readonly onNavigate = (params: SearchFilterParams): void => {
-   const applied = Object.fromEntries(
-     Object.entries(params).filter(([, value]) => value !== undefined));
+   const applied = Object.fromEntries(
+     Object.entries(params).filter(([, value]) => !isEmptySearchValue(value)));
    this.router.navigate([], { queryParams: applied });
  };
```

The shape is forced rather than chosen: a model value of `undefined` yields no field at all, and
writing `undefined` into a live field destroys its node along with its touched state.

#### Setting a filter's value

`setValue` is gone because there is no control to set. Hand over new filter instances instead:

```diff
- this.filters.find(filter => filter.key === 'name')!.setValue(params['name']);
+ this.filters = this.createFilters(params);   // fresh instances carrying the new values
```

The component keeps what the user typed unless the filter's declared `value` changed, compared **by
reference**. A `string` or `number` default therefore survives a rebind that changes nothing, while a
`Date` or an array default is a new object on every rebuild and replaces what the user typed. Hold a
non-primitive default in a field and hand over the same instance when an edit must be left alone. A
different kind of filter for the same key — a text filter replaced by a multi-select, or a date filter
by a date-time one — also starts from its own value rather than inheriting the old one. To keep what
the user applied, declare it on the new filter from the values your `searchAction` last received; an
edit not yet applied is lost, since the component hands out only the values of a search.

The flip side is that a rebind cannot force a value a filter already declares: once the user has
edited or cleared it, handing over the same declaration leaves their value in place. For that, call
`reset(values)` on the component — each filter takes the value given for its key, or else the one it
declares, and forgets that it was touched:

```ts
this.searchFilter().reset(savedSearch);   // values for the keys you name, declared values for the rest
```

A key given as `null` empties its filter; a key left out or given as `undefined` takes its declared
value. Each value must have the shape its filter holds — an array for a multi-select — just as a
declared value must. A server message stays on a filter whose value the reset leaves unchanged, since
that value is still the one the server rejected.

#### Validation and submission

Filters can be validated for the first time. `required: true` on a filter, and the `maxLength` that
was previously only a DOM attribute, are now real rules. **An invalid filter blocks the search** and
focus moves to the offending field — `21.x` searched regardless, because nothing could be invalid.

A date filter is invalid while its text is not a date, and shows
`EntrySearchFilterConfig.invalidDateMessage`. That needs the filter to have held a date: text typed
into an empty date filter leaves its value `null`, unchanged, and Angular does not validate it again,
so the search runs without that filter.

A message the server returned keeps its filter invalid until the user edits that filter, so the next
search is blocked too. That is Angular's own mechanism rather than a choice made here: a field's
submission errors are a `linkedSignal` over that field's value, so they are discarded when that
value changes and at no other time. **Editing a different filter does not re-enable the search** —
only the rejected one does.

A message that arrives for a filter the user changed while the search was running is dropped, since
it is about a value no longer there. A message for no filter is dropped once any filter changed.

Clear is not a way out of that state either, unless it changes the value in question. It empties
every filter, and for a filter the server rejected while it was already empty the write is a no-op,
so the message stays attached while `reset` marks the field untouched and Material stops displaying
it. If a filter must not be submitted empty, give it `required: true`, which is validated on the
client and clears normally, rather than relying on the server to reject it.

#### Clearing

There is a Clear button now, labelled through `EntrySearchFilterConfig.clearButtonText`. It empties
every filter and forgets which were touched. It clears rather than restoring declared values, and
handing the same filters over again does not bring a default back either — `reset()` does, see
[Setting a filter's value](#setting-a-filters-value).

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

### 14. Components, directives and pipes are standalone

Every component, directive and pipe in `@enigmatry/entry-components` is now standalone. The modules
are still there and export the same pieces, so `EntryComponentsModule` and the per-feature modules
keep working unchanged. Nothing here needs action unless you want to drop the modules:

```diff
  @Component({
-   imports: [MatButtonModule, EntryButtonModule, EntrySearchFilterModule, EntryDateTimePickerModule]
+   imports: [MatButton, EntryButtonDirective, EntrySearchFilterComponent, EntryDateTimePickerComponent]
  })
```

| Module | Import instead |
|-|-|
| `EntryButtonModule` | `EntryButtonDirective` |
| `EntryCommonModule` | `AutoDisableButtonDirective`, `ScrollToInvalidControlDirective` |
| `EntryDateTimePickerModule` | `EntryDateTimePickerComponent` |
| `EntryDialogModule` | `EntryDialogComponent`, in a custom dialog that renders `<entry-dialog>`; nothing to open a dialog |
| `EntryFileInputModule` | `EntryFileInputComponent` |
| `EntryPermissionModule` | `EntryPermissionDirective`, `EntryPermissionPipe` |
| `EntrySearchFilterModule` | `EntrySearchFilterComponent` |
| `EntrySpinnerModule` | `EntrySpinnerComponent` |
| `EntryTableModule` | `EntryTableComponent` |
| `EntryValidationModule` | `EntryFormErrorsComponent`, `EntryDisplayControlValidationDirective` |

`EntryComponentsModule.forRoot()` and `EntryCommonModule.forRoot()` register providers, not
declarations. Without them, list the providers in your application config: `NG_EVENT_PLUGINS`
from `@enigmatry/entry-components/common` for the `.debounce` and `.throttle` event modifiers, and
`{ provide: EntryPermissionService, useClass: … }` for the permission directive, pipe and guard.

- **Drop `EntryButtonModule` without importing `EntryButtonDirective`, and nothing tells you.** The
  directive is matched by the `entry-submit-button` and `entry-cancel-button` attributes alone, so a
  template that lost it still compiles and renders a plain `mat-button`, without the configured type
  and colour. Search your templates for both attributes before removing the module.
- **`EntryDialogService` is provided in root.** A standalone component can inject it without
  importing anything. `EntryDialogModule` still brings its own `EntryDialogService`, `MatDialog` and
  CDK `Dialog`, so a lazy-loaded module that imports it keeps opening dialogs that read the
  `ENTRY_DIALOG_CONFIG` provided there. Without the module, everything comes from root and reads the
  root configuration. A standalone route that provides its own `provideEntryDialogConfig()` needs
  `importProvidersFrom(EntryDialogModule)` in the same `providers`: adding just `EntryDialogService`
  is not enough, because the dialog's content gets its injector from the CDK `Dialog`, which would
  still be the root one, so only `disableClose` would follow the route's configuration.
- **Do not import `EntryDialogModule` or `MatDialogModule` into a standalone dialog component.**
  Both carry providers. A dialog component is created dynamically, and a standalone component that
  imports a module with providers is then given an environment injector of its own, holding a second
  instance of everything those modules provide. Material hands its dialog bookkeeping up to the root
  `MatDialog`, so the dialogs still close together, but any other service such a module provides is
  no longer the one the rest of the application holds. Import `EntryDialogComponent` and Material's
  dialog directives (`MatDialogTitle`, `MatDialogContent`, `MatDialogActions`, `MatDialogClose`)
  instead.
- **`DEFAULT_PERCENTAGE_MULTIPLIER` defaults to `1`.** A standalone `EntryTableComponent` formats
  `percent` columns without a provider. `EntryTableModule` still provides `1` itself, as before.
- **`@enigmatry/eslint-config` 22.x reports `@angular-eslint/prefer-standalone` as an error** for
  your own `standalone: false` declarations. `ng g @angular/core:standalone
  --mode=convert-to-standalone --path=<folder>` converts them a folder at a time. When Prettier is
  installed, the schematic reformats every file it touches; a temporary `.prettierignore` listing
  those folders keeps the diff to the decorators and imports.

## About Enigmatry

Entry is the open-source foundation Enigmatry builds client systems on. Enigmatry is a software company from Rotterdam, founded in 2006, with teams in Belgrade and Novi Sad.

* How we use Entry for clients: https://www.enigmatry.com/en/entry/
* How we build, with agents under checks: https://www.enigmatry.com/en/how-we-build/

Apache-2.0 © Enigmatry
