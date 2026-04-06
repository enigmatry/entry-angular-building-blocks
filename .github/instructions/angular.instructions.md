---
description: 'Guidelines for Angular development in this project'
applyTo: '**/*.ts'
---

# Angular Development

## Async / Await over RxJS

- **For any Observable that emits a single value and completes (e.g., HTTP calls, `TranslateService.get()`, `firstValueFrom`-compatible sources), always use `async/await` with `firstValueFrom()` instead of `.subscribe()`.**
- Reserve `.subscribe()` exclusively for **true streams** — Subjects, event buses, or any Observable that emits multiple values over time (e.g., `kernel.ready`, route events, WebSocket streams).
- Never store a subscription just to call `.unsubscribe()` on it when `firstValueFrom` would work instead.

```ts
// ✅ correct — one-shot HTTP call
const data  = await firstValueFrom(this.http.get<MyType>('/api/data'));

// ❌ avoid
this.http.get<MyType>('/api/data').subscribe(data => this.data = data);

// ✅ correct — true stream (Subject, fires multiple times)
this.searchFilterChange.subscribe(params => { ... });
this.router.events.subscribe(event => { ... });
```

## Error Handling

- Always handle errors from `async` calls with `try/catch`. Never use an empty catch block.
- Log errors with `console.error` for infrastructure/background failures; surface user-facing errors via Angular Material snackbar or dialog.

## Standalone migration

- New components and directives should use `standalone: true`. The workspace is incrementally migrating away from NgModules.
- Components with a Formly dependency (`@ngx-formly/*`) must remain `standalone: false` until Formly is removed — do not convert them.
- When converting an existing component to standalone, remove it from the `declarations` array of its NgModule and add its imports directly.
- Keep components thin — delegate business logic to injected services.
- Use `inject()` for dependency injection rather than constructor injection.
- Use the `readonly` arrow-function property syntax for all class methods **except** Angular lifecycle hooks (`ngOnInit`, `ngOnDestroy`, `ngOnChanges`, etc.), which must be plain methods so the framework can bind them through the interface:
  ```ts
  // ✅ correct
  ngOnInit(): void { ... }
  readonly myMethod = (): void => { ... };

  // ❌ avoid
  readonly ngOnInit = (): void => { ... };  // framework won't call this
  myMethod(): void { ... }                   // use readonly arrow instead
  ```
