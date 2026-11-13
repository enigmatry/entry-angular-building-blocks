import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { NG_EVENT_PLUGINS } from '@enigmatry/entry-components/common';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';

/**
 * Change detection is zoneless: `bootstrapApplication` provides it by default, and zone.js is not loaded.
 * `SharedModule` comes in through `importProvidersFrom` so its own providers still override those of the
 * modules it imports - `DateFnsAdapter` over `MatNativeDateModule`'s `DateAdapter`.
 * `NG_EVENT_PLUGINS` registers the `.debounce` and `.throttle` event modifiers.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(SharedModule),
    ...NG_EVENT_PLUGINS,
    // Angular 22 changed the default to 'always'. Pinned to 'emptyOnly' so a child route
    // without its own data does not inherit the parent's - entryPermissionGuard reads
    // route.data['permissions'] and would otherwise silently inherit instead of denying.
    provideRouter(routes, withRouterConfig({ paramsInheritanceStrategy: 'emptyOnly' })),
    provideHttpClient()
  ]
};
