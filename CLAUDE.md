# Entry Angular Building Blocks

Multi-project Angular workspace containing published npm libraries and a demo application:

| Path | Package | Purpose |
|---|---|---|
| `libs/entry-components` | `@enigmatry/entry-components` | Core UI component library (Angular Material-based) |
| `libs/entry-form` | `@enigmatry/entry-form` | Form components used by entry-code-generation (.NET) |
| `libs/eslint-config` | `@enigmatry/eslint-config` | Shared ESLint ruleset |
| `libs/stylelint-config` | `@enigmatry/stylelint-config` | Shared Stylelint ruleset |
| `libs/scss-foundation` | `@enigmatry/scss-foundation` | SCSS design tokens and utilities |
| `apps/demo-app` | — | Documentation/demo application |

The package major version tracks the supported Angular version (e.g., `22.x` = Angular 22).

---

## Hard rules

- **Never edit `*.generated.*` files** (`.generated.ts`, `.generated.html`, `.generated.scss`). They are produced by the `entry-codegen` .NET CLI. Modify the generator or its templates instead.
- **Never import across secondary entry points with a relative path.** Use the scoped package name — `@enigmatry/entry-components/common`, not `../common/utils/provide-config`.
- **These are published npm packages.** Removing or renaming an export from any `public-api.ts` is a breaking change for consumers — call it out rather than doing it silently.
- **Never use `new InjectionToken(...)` or `useValue` for component config.** Use the configuration pattern below.

---

## Commands

```bash
# Build libraries (dependency order matters)
npm run entry-components:build          # build @enigmatry/entry-components
ng build @enigmatry/entry-form          # build @enigmatry/entry-form
ng build @enigmatry/demo-app            # build demo app (run `npm run typedoc` first, or the API tab shows no documentation)

# `npm run build` alone fails — this is a multi-project workspace, always specify a project

# API reference (typedoc → apps/demo-app/src/assets/api/, gitignored — never commit it)
npm run typedoc                         # generate it; `npm start` runs this first via `prestart`

# Lint (all)
npm run lint                            # TypeScript ESLint + stylelint (reports only, never rewrites files)
npm run lint:fix                        # the same chain with --fix, for local use
npm run lint:ts                         # TypeScript only

# Tests
npm run automated-tests                 # compiles themes + runs the scss-foundation and entry-form tests
npm run entry-form:test                 # entry-form Vitest specs (ng test) in isolation
cd libs/scss-foundation && npm run test # run SCSS tests in isolation
```

### Before reporting a change complete

Run `npm run lint` always; add `npm run entry-components:build` if you touched `libs/entry-components`, `npm run entry-form:test` if you touched `libs/entry-form`, and `npm run automated-tests` if you touched `libs/scss-foundation`.

**Only `libs/entry-form` (`field-format` and `validation`) has Angular unit tests.** `npm run entry-form:test` runs its Vitest specs; nothing else in `entry-components`, `entry-form` or the demo app has specs. Describe a TypeScript change as "tested" only when those specs cover it; otherwise it is lint-checked and build-checked. Say which of those actually ran.

---

## Architecture

### Library structure (entry-components)

`entry-components` is built as an **ng-packagr library with secondary entry points**. Each feature area is its own sub-package with its own `ng-package.json`, `public-api.ts`, and a wrapper `NgModule`:

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
  table/            → @enigmatry/entry-components/table
  validation/       → @enigmatry/entry-components/validation
  modules/          → aggregate EntryComponentsModule (re-exports all sub-modules)
  public-api.ts     → @enigmatry/entry-components (barrel)
```

Each entry point exposes only what's in its `public-api.ts`.

`EntryComponentsModule` re-exports all sub-modules. Module-based consumers import it in `shared.module.ts` and call `.forRoot()` in `app.module.ts` to register providers; standalone consumers import the components, directives and pipes directly.

### Standalone migration

Every component, directive and pipe in `entry-components` is standalone. Each entry point keeps its `NgModule` as a wrapper that imports and re-exports the standalone pieces, the way `EntryTableModule` does, so consumers can import either. Removing a module, or an export from one, is a breaking change. The demo app's own declarations are standalone too: each documentation page imports its example components directly, and each example provides its own configuration, or the page provides it from an `*.providers.ts` file when its examples share it (the date-time picker's). Only the Formly code still declares through modules: `entry-form`, for which the root `eslint.config.js` turns `@angular-eslint/prefer-standalone` off in `libs/entry-form/**`, and the demo's Form page and Formly validation examples, for which `apps/demo-app/eslint.config.js` turns it off in `examples/form/**` and `examples/validation/formly/**`.

To convert, run `ng g @angular/core:standalone --mode=convert-to-standalone --path=<entry point>` one entry point at a time, dependencies first. Then check its output by hand:

- It writes relative imports across entry points; rewrite them to `@enigmatry/entry-components/<entry point>` (see Hard rules).
- With Prettier installed it reformats every file it touches. A temporary `.prettierignore` listing the folder keeps the diff to decorators and imports; delete it afterwards.
- `EntryButtonDirective` is matched by attributes alone, so a template that lacks it in `imports` compiles and silently renders a plain `mat-button`.
- A standalone dialog component must not import an `NgModule` with providers (`MatDialogModule`, `EntryDialogModule`): created dynamically, it gets an environment injector of its own with second instances of those providers. Import the standalone directives instead.

Formly is **not** the blocker it was once assumed to be. `entry-components` has no `@ngx-formly` imports at all; Formly lives only in `entry-form` and the demo app's form/validation examples, and a standalone component can be imported into an `NgModule` regardless. The one piece needing design work is `FormlyAutocompleteModule`, which registers its field type through `FormlyModule.forChild()`.

When working on a component, prefer standalone.

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

`createInjectionToken` creates a root-scoped `InjectionToken` with a factory. `provideConfig` produces a `useFactory` provider.

A **new** configuration family spells the word out, as the table's already does: `EntryXxxConfiguration`, `ENTRY_XXX_CONFIGURATION`, `provideEntryXxxConfiguration` (`entry-blueprint:frontend-foundations` forbids abbreviations). The existing `Config` names are published API and are never renamed.

User-facing text in a library component is a default in its configuration class, which consumers translate or replace through the provider function; the libraries do not use `$localize`, and the demo app is English only.

### Signals API

Newer components (starting with `EntryTableComponent`) use the Angular signals API. Prefer this for new work:

```ts
// inputs/outputs
readonly columns = input<ColumnDefinition[]>([]);
readonly pageChange = output<PageEvent>();

// derived state
readonly displayedColumns = computed(() => this.columns().filter(...).map(...));
readonly rowSelection = linkedSignal(() => new SelectionModel<T>(this.multiSelectable(), this.rowSelected()));

// async resources
readonly usersResource = resource({ loader: async () => lastValueFrom(this.usersService.getUsers({})) });
```

Use `effect()` for side effects that react to signal changes — not to derive state (use `computed()` for that).

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
new SelectSearchFilter({ key: 'status', label: 'Status', options: [...] })  // or a Signal of options
new AutocompleteSearchFilter({ key: 'type', label: 'Type', ... })
new DateSearchFilter({ key: 'date', label: 'Date' })
new DateTimeSearchFilter({ key: 'createdAt', label: 'Created' })
```

Pass the array to `<entry-search-filter [searchFilters]="filters" [searchAction]="search">`. The required `searchAction` runs the search and returns the server's messages, which the component places on their filters; `(searchFilterChange)` is only for a caller that navigates instead of fetching there.

- The filter models are configuration only: `formControl`, `setValue` and `toFormControl` are gone. To change a value, pass new filter instances.
- `SelectSearchFilter.options` takes a fixed array or a `Signal`; `options$` is gone, so wrap an `Observable` with `toSignal(source$)`.

---

## Skills

The Enigmatry front-end rules come from the shared Claude Code plugin `entry-blueprint` ([enigmatry/claude-plugins](https://github.com/enigmatry/claude-plugins)), which `.claude/settings.json` enables; install it once, see `README.md`. This file holds the facts about this repository that the plugin's skills ask for, and `.claude/skills/` holds the two skills the plugin has no counterpart for:

| Skill | Load when | Covers |
|---|---|---|
| `scss-tests` | Adding or reviewing SCSS mixins/functions in `libs/scss-foundation` | Writing sass-true tests: file conventions, assertions, error paths, coverage checklist. Used instead of `entry-blueprint:frontend-styling` → `references/scss-unit-tests.md` |
| `azure-devops-pipelines` | Editing `azure-pipelines.yml`, `deploy-demo.yml` or `pipeline-templates/` | MinVer versioning, stage structure, artifact naming, FileTransform variables, add-a-library checklist. Used instead of `entry-blueprint:azure-devops-pipelines`, which describes the Entry Blueprint layout |

### Shared Enigmatry plugin (`entry-blueprint`)

- **The plugin's skills that apply as they are**: `frontend-foundations`, `typescript`, `angular`, `frontend-styling` and `a11y` when writing code, `angular-testing` when writing `libs/entry-form` specs, and `frontend-code-review` when reviewing; it reads this file for the patterns specific to this repository. `baseline-security-audit` only when someone explicitly asks for a Baseline Security audit.
- **The plugin's skills that do not apply here**: `generating-e2e-tests` (no Playwright suite), `code-review-blueprint`, `aspnet-rest-apis` and `csharp-unit-tests` (no .NET code), and `pull-request` and `jira-branch` (this repository is on GitHub, not Azure DevOps Repos; see *Workflow* below).
- **Hooks**: all off (`ENIGMATRY_ENABLED_HOOKS` is `none`). `require-test-skill`, `format-on-edit` and `dotnet-format-gate` act only on `.cs` files, and `code-review-gate` demands the .NET-oriented `code-review-blueprint`. A hook added in a later plugin version stays off until it is listed.
- **MCP servers**: the plugin supplies the Azure DevOps server; `.mcp.json` adds Jira (`atlassian`, Atlassian's v2 endpoint; sign in once with `/mcp`) and the rest.

#### Facts about this repository that the plugin relies on

- **Published packages.** Everything under `libs/` is published to npm. Every member of a class that an entry point's `public-api.ts` re-exports is published API, so narrowing its visibility is a breaking change made deliberately and recorded in `libs/entry-components/README.md`'s migration notes (*Member visibility* below).
- **API reference from JSDoc.** TypeDoc generates the demo app's API tab from doc comments, so `entry-blueprint:frontend-foundations`' exception for generated reference docs applies: every exported symbol needs one.
- **Library text.** Libraries expose user-facing text as configuration defaults, not `$localize` (*Configuration pattern* above); the demo app is English only, so `entry-blueprint:angular` → *i18n* does not apply.
- **Failure reporting.** The libraries have no notification service or global error interceptor of their own; a failure they cannot handle propagates to the consuming application.
- **Angular unit tests in `libs/entry-form` only.** `@enigmatry/entry-form` runs Vitest specs through `ng test` (Angular's `@angular/build:unit-test` builder in jsdom, as EBO's applications do), currently for `field-format` and `validation`, written to `entry-blueprint:angular-testing`. Specs import `describe`, `it` and `expect` from `vitest` rather than using globals, and their ESLint rules sit in the root `eslint.config.js`. Shared test hosts, builders and helpers live in a `testing/` folder beside the specs, which `tsconfig.lib.json` excludes from the library build. Coverage is not collected. A change to code those specs cover updates them; elsewhere a TypeScript change without a spec is not a review finding, and no `*.spec.ts` file is added as a side effect of other work. The sass-true suite in `libs/scss-foundation` still runs on Jest, a legacy runner by `entry-blueprint:angular-testing`'s standard; its migration to Vitest is a change of its own.
- **Lint.** `npm run lint` (ESLint + Stylelint, report only) is the CI gate.
- **Workflow.** Branches are `BP-<number>/<slug>`, commits `BP-<number> - <Description>`, and pull requests are opened on GitHub against `master` with a body that starts with the line `PR description`. Do not assign or transition Jira tickets unless asked.

#### Project decisions that override entry-blueprint

Where a plugin skill and this file differ, this file wins:

- **A class that `extends` a base class keeps prototype methods throughout**, including methods the base does not declare (*Method declarations* below). `entry-blueprint:typescript` keeps method syntax only for members that rely on `super`; here the whole class stays in one form, so it is clear which members are constrained.

---

## Additional Patterns

### Server-side validation

Use `setServerSideValidationErrors(problemDetails, form)` from `@enigmatry/entry-components/validation` to map `IValidationProblemDetails` (RFC 7807) error responses onto a reactive form. Field-level errors land on the matching `FormControl` under the key `fromServer`; unmatched errors land on the form under `general`. Display form-level errors with `<entry-form-errors [form]="myForm">`. Not for `<entry-search-filter>`: it runs on signal forms and has no reactive form, so its server errors come back through `searchAction` (above).

### Permissions abstraction

`EntryPermissionService` is an abstract class. Consumers extend it and pass their implementation via `EntryComponentsModule.forRoot({ permissionService: MyPermissionService })`. In templates, use `EntryPermissionDirective` as an attribute binding on an element (`[entryPermissionsOnly]="[...]"` or `[entryPermissionsExcept]="[...]"`, not the `*` structural form) or the `entryHasPermissions` pipe. The service is never instantiated directly, and never provided with `useValue`.

### Event plugins (debounce / throttle)

Available globally via `NG_EVENT_PLUGINS` (registered in `EntryComponentsModule.forRoot()`):

```html
<button (click.debounce)="save()">Save</button>
<input (keyup.debounce.300)="search()">       <!-- 300 ms debounce -->
<button (click.throttle.1000)="submit()">Submit</button>
```

### entry-form and code generation

`@enigmatry/entry-form` provides form wrappers (`EntryFormModule`) consumed by Angular components generated by the `entry-codegen` .NET CLI tool. The generated components live under `apps/demo-app/src/app/examples/form/form-example/generated/` and serve as reference examples of what generated code looks like. `UntypedFormGroup` / `UntypedFormControl` in generated or Formly code is expected there.

---

## Key Conventions

### Angular control flow syntax
Use `@if`, `@for`, `@switch`/`@case`/`@default` exclusively. Never use `*ngIf`, `*ngFor`, `[ngSwitch]`, `*ngSwitchCase`, etc. Every `@for` needs a `track` expression.

```html
@if (condition) { ... }
@for (item of items; track item.id) { ... }
@switch (value) { @case ('a') { ... } }
```

### Dependency injection
Use the `inject()` function. Constructor injection is only acceptable when decorators are required (e.g., `@Inject(DOCUMENT)`). There are currently no such cases in this workspace — `SpinnerOverlayContainer` was the last one, and it lost its constructor in Angular 22 when CDK's `OverlayContainer` moved to `inject()` internally.

```ts
private readonly config = inject(ENTRY_DIALOG_CONFIG);
```

### Method declarations
Every class's methods use `readonly` arrow-function properties — **components, directives, services,
and plain helper classes alike**. A file with no `@Component` is not exempt, and neither is a new
method added to a file whose existing methods are prototype-style.

```ts
readonly save = (): void => { ... };        // ✅ regular method
private readonly toKey = (x: number): string => { ... };
ngOnInit(): void { ... }                   // ✅ lifecycle hook
readonly ngOnInit = (): void => { ... };   // ❌ never called
save(): void { ... }                       // ❌ use readonly arrow
```

Two exceptions, both because a property cannot stand where a prototype method is required:

- **Angular lifecycle hooks** — the framework calls them by name through an interface.
- **A class that `extends` a base class** keeps prototype methods throughout. A field arrow is
  assigned after `super()` returns, so a base constructor calling the member finds `undefined`, and
  TypeScript rejects a property that implements or overrides a base *method*. `EntryDateTimeAdapter`
  is the standing example: it extends `DateAdapter`, so all of its methods — including new ones the
  base does not declare — stay prototype-style rather than splitting the class between two forms.

An interface is **not** an exception: `implements` is satisfied by an arrow property, and Angular's
signal-forms `FormValueControl` members (`focus`, `reset`) are plain property reads at runtime.

### Member visibility
Pick the narrowest modifier that still compiles, member by member:

- reached only from the owning component's or directive's **own template** — `protected readonly`.
  Templates can see protected members, so `public` would overstate the surface.
- reached only from inside the declaring class — `private readonly`.
- reached from any **other** class — `public`. This includes a component reading a helper class it
  owns, and a helper member a template reaches *through* that helper's reference. TypeScript grants
  `protected` to subclasses only, so `protected` cannot express "my owner may read this".

```ts
protected readonly rows = computed(() => ...);   // template only
private readonly toKey = (x: number): string => { ... };  // neither template nor other classes
readonly value: Signal<File | undefined> = ...;  // public: read by other components/services
```

**A plain helper class has no template of its own, so the first case never applies to it.** Narrow one
by making `private` everything its owner never touches and leaving the rest `public` —
`EntryDateTimePickerControls` is correct at `public` for `write`/`setDisabled`/`display`/`calendar`,
because `EntryDateTimePickerComponent` and that component's template are the callers.

A signal `input()`, `output()` or `model()` on a component other templates bind to cannot be
`protected` at all — `ɵUnwrapDirectiveSignalInputs` constrains the field names with `keyof`, which
excludes protected keys. None of the workspace's 127 signal inputs/outputs are protected.

**In `libs/` this applies to demo/app code and to genuinely internal library members only.** These
are published packages — narrowing an exported class's member from `public` to `protected` removes it
from the published API and breaks consumers. `public-api.ts` lists classes, not members, so the test
is whether the *declaring class* is re-exported from its entry point; if it is, every member is
published surface. Narrow deliberately and call the change out in `libs/entry-components/README.md`'s
migration notes. A class no `public-api.ts` re-exports is internal and exempt.

### Async handling
One-shot Observables (HTTP calls, `TranslateService.get()`) use `firstValueFrom()` with `async/await`. Reserve `.subscribe()` for true multi-value streams — Subjects, event buses, router events, websockets.

```ts
const data = await firstValueFrom(this.http.get<MyType>('/api/data'));  // ✅
this.http.get<MyType>('/api/data').subscribe(d => this.data = d);       // ❌
this.router.events.subscribe(e => { ... });                             // ✅ true stream
```

Always `await` async calls — never `void somePromise()`. Catch only where the code can recover or tell the user (`entry-blueprint:frontend-foundations` → *Failure handling*); let everything else propagate — in a library, to the consumer, as `EntryDialog.submit` does with `try/finally`. **Never leave a catch block empty.** Log background failures with `console.error`; surface user-facing errors via snackbar or dialog.

### Naming and files
- kebab-case filenames (`user-session.ts`); PascalCase for classes/interfaces/enums/type aliases, UPPER_SNAKE_CASE for injection tokens, camelCase for everything else.
- No `I` prefix on interfaces.
- **One class or enum per file**; a file may also declare that class's own input and result types until a second file imports them (`entry-blueprint:typescript` → *Files and declarations*).
- Always use braces for control-flow clauses, even single-line bodies.
- Avoid `any` — prefer `unknown` plus narrowing.

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
