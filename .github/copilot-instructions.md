# Copilot Instructions

## Repository Overview

Multi-project Angular workspace containing published npm libraries and a demo application:

| Path | Package | Purpose |
|---|---|---|
| `libs/entry-components` | `@enigmatry/entry-components` | Core UI component library (Angular Material-based) |
| `libs/entry-form` | `@enigmatry/entry-form` | Form components used by entry-code-generation (.NET) |
| `libs/eslint-config` | `@enigmatry/eslint-config` | Shared ESLint ruleset |
| `libs/stylelint-config` | `@enigmatry/stylelint-config` | Shared Stylelint ruleset |
| `libs/scss-foundation` | `@enigmatry/scss-foundation` | SCSS design tokens and utilities |
| `apps/demo-app` | — | Documentation/demo application |

The package major version tracks the supported Angular version (e.g., `21.x` = Angular 21).

---

## Commands

```bash
# Build libraries (must be done in dependency order)
npm run entry-components:build          # build @enigmatry/entry-components
ng build @enigmatry/entry-form          # build @enigmatry/entry-form

# Build demo app
ng build @enigmatry/demo-app

# `npm run build` alone fails — this is a multi-project workspace, always specify a project

# Lint (all)
npm run lint                            # TypeScript ESLint + stylelint
npm run lint:ts                         # TypeScript only

# Tests (SCSS only — no Angular unit test suite exists)
npm run automated-tests                 # compiles themes + runs scss-foundation tests
cd libs/scss-foundation && npm run test # run SCSS tests in isolation
```

---

## Architecture

### Library structure (entry-components)

`entry-components` is built as an **ng-packagr library with secondary entry points**. Each feature area is its own sub-package with its own `ng-package.json`, `public-api.ts`, and `NgModule`:

```
libs/entry-components/
  button/           → @enigmatry/entry-components/button
  common/           → @enigmatry/entry-components/common       (utilities, directives, event plugins, interceptors)
  dialog/           → @enigmatry/entry-components/dialog
  date-time-picker/ → @enigmatry/entry-components/date-time-picker
  file-input/       → @enigmatry/entry-components/file-input
  permissions/      → @enigmatry/entry-components/permissions
  search-filter/    → @enigmatry/entry-components/search-filter
  spinner/          → @enigmatry/entry-components/spinner
  table/            → @enigmatry/entry-components/table        (already standalone)
  validation/       → @enigmatry/entry-components/validation
  modules/          → aggregate EntryComponentsModule (re-exports all sub-modules)
  public-api.ts     → @enigmatry/entry-components (barrel)
```

Each entry point exposes only what's in its `public-api.ts`. Never import across entry-point boundaries using relative paths — always use the scoped package name (e.g., `@enigmatry/entry-components/common`).

`EntryComponentsModule` re-exports all sub-modules. Consumers import it in `shared.module.ts` and call `.forRoot()` in `app.module.ts` to register providers.

### Standalone migration

Most lib components currently use `standalone: false` because of a Formly dependency. Migration to standalone is in progress — `EntryTableComponent` and demo app components are already standalone. When working on a component, prefer standalone if possible; if touching a non-standalone component with a Formly dependency, leave it as-is until Formly can be removed.

### Configuration pattern

Every configurable component follows the same pattern — `XxxConfig` class + injection token + provider function, always using the utilities from `@enigmatry/entry-components/common`:

```ts
// 1. Config class with defaults in constructor
export class EntryDialogConfig {
  confirmButtonText: string;
  constructor(config: Partial<EntryDialogConfig> = {}) {
    this.confirmButtonText = config.confirmButtonText ?? 'Ok';
  }
}

// 2. Root-provided injection token with default value
export const ENTRY_DIALOG_CONFIG = createInjectionToken(new EntryDialogConfig());

// 3. Provider helper for consumers to override defaults
export const provideEntryDialogConfig = (config: Partial<EntryDialogConfig>): Provider =>
  provideConfig(ENTRY_DIALOG_CONFIG, () => new EntryDialogConfig(config));
```

`createInjectionToken` creates a root-scoped `InjectionToken` with a factory. `provideConfig` produces a `useFactory` provider. Never use bare `new InjectionToken(...)` or `useValue` for config.

### Signals API

Newer components (starting with `EntryTableComponent`) use the Angular signals API. Prefer this for new work:

```ts
// inputs/outputs
readonly columns = input<ColumnDefinition[]>([]);
readonly pageChange = output<PageEvent>();

// derived state
readonly displayedColumns = computed(() => this.columns().filter(...).map(...));
readonly pageIndex = linkedSignal<number>(() => 0);

// async resources
readonly usersResource = resource({ loader: async () => lastValueFrom(this.usersService.getUsers({})) });
```

Use `effect()` for side effects that react to signal changes.

### Table component

`EntryTableComponent` (standalone) accepts:
- `data`: either a plain `T[]` or a `PagedData<T>` (with `items`, `totalCount`, `pageSize`, `pageNumber`)
- `columns`: array of `ColumnDefinition` — set `type: 'date'` with optional `typeParameter: { format: 'dd-MM-yyyy' }` for formatted cells
- `contextMenuItems`: hierarchical menu items with `id` and optional `items` for sub-menus

For server-side pagination/sorting, use `PagedQuery` from `@enigmatry/entry-components/table` — it implements `OnPage` and `OnSort` and handles `applyRouteChanges`/`getRouteQueryParams` for URL-persisted state.

### Search filter model hierarchy

Search filter inputs are configured as model objects (not components directly):

```ts
// Extend SearchFilterBase<T> or use one of the built-in subclasses:
new TextSearchFilter({ key: 'name', label: 'Name' })
new SelectSearchFilter({ key: 'status', label: 'Status', options: [...] })  // or options$: Observable
new AutocompleteSearchFilter({ key: 'type', label: 'Type', ... })
new DateSearchFilter({ key: 'date', label: 'Date' })
new DateTimeSearchFilter({ key: 'createdAt', label: 'Created' })
```

Pass the array to `<entry-search-filter [searchFilters]="filters" (searchFilterChange)="onSearch($event)">`.

---

## Further Instructions

Detailed, automatically-applied instructions live in `.github/instructions/`. They are loaded by Copilot when the file you're working on matches their `applyTo` glob — you don't need to invoke them manually:

| File | Triggered for | Covers |
|---|---|---|
| `angular.instructions.md` | `**/*.ts` | async/await over RxJS, `inject()`, standalone migration, control flow syntax, lifecycle hooks |
| `typescript-5-es2022.instructions.md` | `**/*.ts` | Arrow methods, strict types, error handling, security, immutability |
| `azure-devops-pipelines.instructions.md` | `**/azure-pipelines*.yml` | Azure DevOps YAML best practices (generic) |
| `code-review-generic.instructions.md` | `**` | Structured review framework: security, tests, logic, style priorities |

For deeper project-specific guidance, invoke the matching skill:

| Skill | Invoke with | Covers |
|---|---|---|
| `code-review` | `/code-review-fosim` | Project review rules: config pattern, entry-point boundaries, signals API, search filter models, scss requirement |
| `scss-tests` | `/scss-tests` | Writing sass-true tests for `libs/scss-foundation` |
| `azure-devops-pipelines` | `/azure-devops-pipelines` | Project-specific pipeline conventions: MinVer, artifact naming, FileTransform variables |

### Server-side validation

Use `setServerSideValidationErrors(problemDetails, form)` from `@enigmatry/entry-components/validation` to map `IValidationProblemDetails` (RFC 7807) error responses onto a reactive form. Field-level errors land on the matching `FormControl` under the key `fromServer`; unmatched errors land on the form under `general`. Display form-level errors with `<entry-form-errors [form]="myForm">`.

### Permissions abstraction

`EntryPermissionService` is an abstract class. Consumers extend it and pass their implementation via `EntryComponentsModule.forRoot({ permissionService: MyPermissionService })`. Use the `*hasPermission` directive or `hasPermission` pipe in templates.

### Event plugins (debounce / throttle)

Available globally via `NG_EVENT_PLUGINS` (registered in `EntryComponentsModule.forRoot()`):

```html
<button (click.debounce)="save()">Save</button>
<input (keyup.debounce.300)="search()">       <!-- 300 ms debounce -->
<button (click.throttle.1000)="submit()">Submit</button>
```

### entry-form and code generation

`@enigmatry/entry-form` provides form wrappers (`EntryFormModule`) consumed by Angular components generated by the `entry-codegen` .NET CLI tool. The generated components live under `apps/demo-app/src/app/examples/form/form-example/generated/` and serve as reference examples of what generated code looks like.

---

## Key Conventions

### Angular control flow syntax
Use `@if`, `@for`, `@switch`/`@case`/`@default` exclusively. Never use `*ngIf`, `*ngFor`, `[ngSwitch]`, `*ngSwitchCase`, etc.

```html
@if (condition) { ... }
@for (item of items; track item.id) { ... }
@switch (value) { @case ('a') { ... } }
```

### Dependency injection
Use the `inject()` function. Constructor injection is only acceptable when decorators are required (e.g., `@Inject(DOCUMENT)`), as seen in `SpinnerOverlayContainer`.

```ts
private readonly config = inject(ENTRY_DIALOG_CONFIG);
```

### Component/directive prefix
All selectors use the `entry` prefix (e.g., `entry-spinner`, `[entry-submit-button]`). Demo app uses `app`.

### Attribute-based button directives
Submit and cancel buttons are styled via attribute directives — not components — and their appearance is globally configurable:

```html
<button mat-button entry-submit-button>Save</button>
<button mat-button entry-cancel-button>Cancel</button>
```

Configure defaults with `provideEntryButtonConfig({ submit: { type: 'raised', color: 'primary' } })`.

### Functional HTTP interceptor
`acceptLanguageInterceptor` (`@enigmatry/entry-components/common`) is a functional `HttpInterceptorFn` that forwards Angular's `LOCALE_ID` as the `Accept-Language` header. Register it with `provideHttpClient(withInterceptors([acceptLanguageInterceptor]))`.

### TypeScript strictness
The workspace enables `strict`, `noImplicitOverride`, `noImplicitReturns`, `noPropertyAccessFromIndexSignature`, and `noFallthroughCasesInSwitch`. `strictPropertyInitialization` is disabled. Target is ES2022 with `moduleResolution: bundler`.
