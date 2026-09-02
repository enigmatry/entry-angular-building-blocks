---
name: angular-typescript
description: Full Angular 22 / TypeScript 6 / ES2022 coding standards for this workspace — async handling, DI, standalone migration, type system, error handling, security, performance, and documentation rules. The high-traffic rules are already in CLAUDE.md; load this skill when you need the complete reference, are writing a non-trivial amount of new TypeScript, or are unsure whether a pattern is allowed.
---

# Angular / TypeScript Standards — Entry Angular Building Blocks

Targets Angular 22, TypeScript 6.x, ES2022 output. These are the complete standards; CLAUDE.md carries the subset that applies to nearly every edit.

---

## Core intent

- Respect the existing architecture and coding standards.
- Prefer readable, explicit solutions over clever shortcuts.
- Extend current abstractions before inventing new ones.
- Prioritize maintainability and clarity: short methods, short classes, clean code.
- Note design trade-offs when the intent is not obvious.

---

## Async / await over RxJS

For any Observable that emits a single value and completes — HTTP calls, `TranslateService.get()`, any `firstValueFrom`-compatible source — always use `async/await` with `firstValueFrom()` instead of `.subscribe()`.

Reserve `.subscribe()` exclusively for **true streams**: Subjects, event buses, router events, WebSocket streams — anything that emits multiple values over time.

```ts
// ✅ one-shot HTTP call
const data = await firstValueFrom(this.http.get<MyType>('/api/data'));

// ❌ avoid
this.http.get<MyType>('/api/data').subscribe(data => this.data = data);

// ✅ true stream (fires multiple times)
this.searchFilterChange.subscribe(params => { ... });
this.router.events.subscribe(event => { ... });
```

Never store a subscription just to call `.unsubscribe()` on it when `firstValueFrom` would work instead.

---

## Error handling

- Always handle errors from `async` calls with `try/catch`. **Never use an empty catch block** — not `catch (_) {}`, not `catch (e) { }`.
- Always `await` async calls at the call site. **Never use `void` to discard a Promise.**
- Guard edge cases early to avoid deep nesting.
- Log infrastructure/background failures with `console.error`.
- Surface user-facing errors via Angular Material snackbar or dialog.

---

## Standalone migration

- New components and directives use `standalone: true`. The workspace is incrementally migrating away from NgModules.
- Components with a Formly dependency (`@ngx-formly/*`) must remain `standalone: false` until Formly is removed — **do not convert them**.
- When converting an existing component to standalone, remove it from its NgModule's `declarations` array and add its imports directly.
- Keep components thin — delegate business logic to injected services.

---

## Method declarations

Declare all class methods using the `readonly` arrow-function property syntax. This holds for **every**
class — components, directives, services, and plain non-Angular helper classes alike. A file with no
Angular decorator is not exempt, and neither is a new method added beside existing prototype-style
methods: the surrounding code is not the authority, this rule is.

```ts
// ✅
readonly myMethod = (): void => { ... };
private readonly myHelper = (x: number): string => { ... };

// ❌
myMethod(): void { ... }
private myHelper(x: number): string { ... }
```

**Exception 1 — framework lifecycle hooks.** Angular calls these by name through an interface, so they must be plain methods:

```ts
// ✅
ngOnInit(): void { ... }
ngOnDestroy(): void { ... }
ngOnChanges(changes: SimpleChanges): void { ... }

// ❌ the framework will never call this
readonly ngOnInit = (): void => { ... };
```

**Exception 2 — a class that `extends` a base class** keeps prototype methods throughout, including
methods the base does not declare. Two hard reasons: `useDefineForClassFields` is `false`
(`tsconfig.json`), so a field arrow is assigned only after `super()` returns and a base constructor
calling the member finds `undefined`; and TypeScript rejects a property that implements or overrides
a base-class *method*. Splitting such a class between the two forms hides which members are
constrained, so keep it uniform. `EntryDateTimeAdapter extends DateAdapter` is the standing example.

An **interface** is not an exception. `implements` is satisfied by an arrow property, and the
signal-forms `FormValueControl` members (`focus`, `reset`) are plain property reads at runtime —
Angular passes the component instance as `bindingOptions` and reads the key, which finds an instance
arrow field identically to a prototype method.

**Declaration order matters for arrows.** Field initializers run top to bottom, so an arrow property
must be declared above any *field initializer* that calls it. Calls from a constructor body or from
another method are unaffected.

---

## Member visibility

Pick the narrowest modifier that still compiles, member by member:

- reached only from the owning component's or directive's **own template** — `protected readonly`.
  Templates can see protected members, so `public` overstates the surface.
- reached only from inside the declaring class — `private readonly`.
- reached from any **other** class — `public`. This includes a component reading a helper class it
  owns, and a helper member a template reaches *through* that helper's reference. TypeScript grants
  `protected` access to subclasses only, so `protected` cannot express "my owner may read this".

```ts
protected readonly rows = computed(() => ...);            // template only
private readonly toKey = (x: number): string => { ... };  // neither template nor other classes
readonly value: Signal<File | undefined> = ...;           // public: read by other components
```

`readonly` is part of the rule, not decoration — a `protected` member with no `readonly` is a miss
unless it is genuinely reassigned.

**A plain helper class has no template of its own, so the first case never applies to it.** Narrow one
by making `private` everything its owner never touches and leaving the rest `public`.
`EntryDateTimePickerControls` is correct at `public` for `write`/`setDisabled`/`display`/`calendar`,
because `EntryDateTimePickerComponent` and that component's template are the callers; asking for
`protected` there would not compile.

A signal `input()`, `output()` or `model()` on a component whose bindings come from other templates
cannot be `protected` at all — ngtsc routes restricted input fields through
`ɵUnwrapDirectiveSignalInputs<Dir, Fields extends keyof Dir>`, and `keyof` excludes protected keys.
Zero of this workspace's 127 signal inputs/outputs are protected.

**In `libs/` the narrowing applies to demo/app code and to genuinely internal library members only.**
These are published packages, so narrowing an exported class's member removes it from the published
API. `public-api.ts` lists classes, not members: the test is whether the *declaring class* is
re-exported from its entry point's `public-api.ts`. If it is, every member of it is published surface
— narrow deliberately and record it in `libs/entry-components/README.md`'s migration notes. A class no
`public-api.ts` re-exports is internal and exempt.

---

## Dependency injection

Use the `inject()` function in component/directive/service bodies. Constructor injection is only acceptable when a decorator is unavoidable — e.g. `@Inject(DOCUMENT)`. No file in this workspace currently needs it: `SpinnerOverlayContainer` was the last case, and CDK's `OverlayContainer` stopped taking constructor arguments in Angular 22.

```ts
private readonly config = inject(ENTRY_DIALOG_CONFIG);
```

---

## Project organization

- Follow the repository's folder and responsibility layout for new code.
- Use kebab-case filenames: `user-session.ts`, `data-service.ts`.
- **Define each class and interface in its own dedicated file.** Never declare them inline inside another file.
- Keep tests, types, and helpers near their implementation when it aids discovery.
- Reuse or extend shared utilities before adding new ones.

---

## Naming & style

- PascalCase for classes, interfaces, enums, and type aliases; camelCase for everything else.
- No interface prefixes like `I` — rely on descriptive names.
- Name things for their behavior or domain meaning, not their implementation.
- **Always use braces for every control-flow clause** (`if`, `else`, `for`, `for...of`, `while`) — even single-line bodies.
- Match the project's indentation, quote style, and trailing comma rules; run `npm run lint` before submitting.
- Keep functions focused; extract helpers when logic branches grow.
- Favor immutable data and pure functions when practical.

---

## Type system

- Avoid `any`, implicit or explicit. Prefer `unknown` plus narrowing.
- Use discriminated unions for realtime events and state machines.
- Centralize shared contracts instead of duplicating shapes.
- Express intent with utility types: `Readonly`, `Partial`, `Record`.
- Use pure ES modules — never emit `require`, `module.exports`, or CommonJS helpers.
- Prefer native ES2022 features over polyfills.

---

## Architecture & patterns

- Follow the repository's DI/composition pattern; keep modules single-purpose.
- Observe existing initialization and disposal sequences when wiring into lifecycles.
- Keep transport, domain, and presentation layers decoupled behind clear interfaces.
- Supply lifecycle hooks (`initialize`, `dispose`) and targeted tests when adding services.
- Debounce configuration-driven updates and dispose resources deterministically.

---

## External integrations

- Instantiate clients outside hot paths and inject them for testability.
- Never hardcode secrets; load them from secure sources.
- Apply retries, backoff, and cancellation to network or IO calls.
- Normalize external responses and map errors to domain shapes.

---

## Security

- Validate and sanitize external input with schema validators or type guards.
- Avoid dynamic code execution and untrusted template rendering.
- Encode untrusted content before rendering HTML; use framework escaping or trusted types.
- Use parameterized queries or prepared statements to block injection.
- Keep secrets in secure storage, rotate them, and request least-privilege scopes.
- Favor immutable flows and defensive copies for sensitive data.
- Use vetted crypto libraries only — never roll your own.
- Patch dependencies promptly and monitor advisories.

> ESLint enforces part of this: `eslint-plugin-no-secrets` and `eslint-plugin-no-unsanitized` are active in this workspace.

---

## Configuration & secrets

- Reach configuration through shared helpers and validate with schemas or dedicated validators.
- Handle secrets via the project's secure storage; guard `undefined` and error states.
- Document new configuration keys and update related tests.

---

## UI & UX components

- Sanitize user or external content before rendering.
- Keep UI layers thin; push heavy logic into services or state managers.
- Use messaging or events to decouple UI from business logic.

---

## Testing

This workspace has **no Angular unit test suite** — only SCSS tests via sass-true (see the `scss-tests` skill). When tests are in scope:

- Add or update tests with the project's framework and naming style.
- Expand integration or end-to-end suites when behavior crosses modules or platform APIs.
- Run targeted test scripts for quick feedback before submitting.
- Avoid brittle timing assertions; prefer fake timers or injected clocks.

---

## Performance & reliability

- Lazy-load heavy dependencies and dispose them when done.
- Defer expensive work until users need it.
- Batch or debounce high-frequency events to reduce thrash — the `(click.debounce)` / `(keyup.debounce.300)` event plugins exist for this.
- Track resource lifetimes to prevent leaks.

---

## Documentation & comments

- Add JSDoc to public APIs; include `@remarks` or `@example` when helpful. TypeDoc generates the published docs from these.
- Write comments that capture intent, and remove stale notes during refactors.
- Update architecture or design docs when introducing significant patterns.
