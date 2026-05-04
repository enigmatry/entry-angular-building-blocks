---
name: code-review
description: Code review checklist for the entry-angular-building-blocks workspace. Use this when reviewing or performing a code review on any change in libs/ or apps/demo-app.
---

# Code Review — Entry Angular Building Blocks

You are an expert Angular engineer performing a code review on this workspace. Flag only issues that genuinely matter: bugs, broken conventions, security problems, incorrect architecture. Do not comment on formatting, indentation, or style that ESLint/Stylelint already enforces.

---

## Angular Templates

### Control flow syntax (block)
- `*ngIf`, `*ngFor`, `[ngSwitch]`, `*ngSwitchCase`, `*ngSwitchDefault`, `[ngIf]`, `[ngFor]` are **banned**. Flag any occurrence.
- Every `@for` block **must** have a `track` expression. Flag `@for` blocks missing it.

### `ng-container` / `ng-template` usage
- `ng-container` used only as a grouping wrapper (no rendered element). Flag if used where `@if`/`@for` would suffice.
- `*ngTemplateOutlet` must be replaced with `[ngTemplateOutlet]` (attribute binding form, not structural).

---

## TypeScript / Component conventions

### Standalone migration
- New components should be `standalone: true` unless they have a hard Formly dependency.
- Existing `standalone: false` components with Formly dependencies must stay as-is until Formly is removed — do not flag these as bugs.
- If a PR converts a non-Formly component to standalone, verify it is also removed from its `NgModule` declarations.

### Dependency injection
- Use `inject()` in component/directive/service bodies. Constructor injection is only acceptable when a decorator (`@Inject(TOKEN)`) is unavoidable (e.g., extending a CDK class that requires it).
- Flag `constructor(private foo: FooService)` in any new code.

### Method declarations
- Class methods must use `readonly` arrow-function properties:
  ```ts
  // ✅
  readonly save = (): void => { ... };
  // ❌
  save(): void { ... }
  ```
- **Exception**: Angular lifecycle hooks (`ngOnInit`, `ngOnDestroy`, `ngOnChanges`, `ngAfterViewInit`, etc.) must be plain methods. Flag `readonly ngOnInit = () => {}`.

### Signals API (new components)
- Components adopting the signals API must use `input()`, `output()`, `computed()`, and `linkedSignal()` — not `@Input()` / `@Output()` / `BehaviorSubject` patterns.
- `effect()` is acceptable for side effects that react to signals; flag if used to derive state (use `computed()` instead).

### Async handling
- One-shot Observables (HTTP calls, `TranslateService.get`) must use `firstValueFrom()` + `async/await`, not `.subscribe()`.
- Flag any `.subscribe()` call that isn't a true multi-value stream (Subject, event bus, router events, websocket).
- Flag empty `catch` blocks: `catch (_) {}` or `catch (e) { }`.
- Flag `void somePromise()` — always `await` async calls.

---

## Configuration pattern

When a new configurable component is added, verify all three pieces exist:

1. **`XxxConfig` class** — defaults set in constructor via `?? defaultValue`.
2. **`ENTRY_XXX_CONFIG` token** — created with `createInjectionToken(new XxxConfig())` from `@enigmatry/entry-components/common`.
3. **`provideEntryXxxConfig()` function** — wraps `provideConfig(token, factory)`. Never `useValue`.

Flag any config that uses `new InjectionToken(...)` directly or provides the value via `useValue`.

---

## Library entry-point boundaries

- Imports across secondary entry points must use the scoped package path, never relative paths:
  ```ts
  // ✅
  import { createInjectionToken } from '@enigmatry/entry-components/common';
  // ❌
  import { createInjectionToken } from '../common/utils/provide-config';
  ```
- Each secondary entry point exposes only what is in its `public-api.ts`. Flag any import from an internal path outside the same entry point.

---

## Public API surface

- Every exported symbol intended for library consumers must be re-exported through the entry point's `public-api.ts`.
- Interfaces for data contracts should use `export type { ... }` (type-only export).
- Flag classes/interfaces that are used externally but missing from `public-api.ts`.

---

## Permissions

- `EntryPermissionService` is abstract — it must never be instantiated directly.
- Consumers register their implementation via `EntryComponentsModule.forRoot({ permissionService: MyService })`, where `MyService extends EntryPermissionService`.
- Flag any attempt to `provide: EntryPermissionService, useValue: ...`.

---

## Search filter models

- Search filter models must extend `SearchFilterBase<T>` or a built-in subclass (`TextSearchFilter`, `SelectSearchFilter`, etc.).
- `SelectSearchFilter` with `options$` (Observable) is valid; `options` (fixed array) is also valid — both can coexist.
- Flag direct instantiation of `SearchFilterBase<T>` without a subclass when a suitable subclass exists.

---

## Server-side validation

- `setServerSideValidationErrors(problemDetails, form)` must be called in HTTP error handlers on forms.
- Form-level errors go under the `'general'` key; field-level errors under `'fromServer'`.
- `<entry-form-errors [form]="...">` must be present in templates that use `setServerSideValidationErrors`.

---

## Selector / naming

- All lib selectors use the `entry` prefix: `entry-*` for components, `[entry-*]` for attribute directives.
- Demo app components use `app` prefix.
- Flag selectors that don't follow this convention.

---

## scss-foundation

- SCSS modules must not break the existing test suite (`npm run automated-tests`).
- New mixins/functions in `src/modules/` must have corresponding tests in `tests/` (see the `scss-tests` skill).
- Flag PRs that add new public mixins without tests.

---

## What NOT to flag

- Formatting, trailing commas, quote style — enforced by ESLint/Stylelint.
- `standalone: false` on existing Formly-dependent components.
- Constructor injection inside `SpinnerOverlayContainer` and similar CDK extensions that require `@Inject`.
- Use of `UntypedFormGroup` / `UntypedFormControl` in generated or Formly-related code.
