import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { EntryCommonModule } from '@enigmatry/entry-components/common';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

/**
 * Change detection is zoneless: `bootstrapApplication` provides it by default, and zone.js is not loaded.
 * `SharedModule` comes in through `importProvidersFrom` so its own providers still override those of the
 * modules it imports - `DateFnsAdapter` over `MatNativeDateModule`'s `DateAdapter`.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      SharedModule,
      EntryCommonModule.forRoot(),
      AppRoutingModule
    ),
    provideHttpClient()
  ]
};
