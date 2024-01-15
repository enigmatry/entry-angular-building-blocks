import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { EntryPermissionModule, EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
import { EntryTableModule } from '@enigmatry/entry-components/table';
import { EntryCommonModule, NG_EVENT_PLUGINS } from '@enigmatry/entry-components/common';
import { EntrySpinnerModule } from '@enigmatry/entry-components/spinner';

interface EntryComponentsModuleOptions {
  permissionService?: Type<any>;
}

/**
 * Exports all entry components.
 *
 * Usage
 * import EntryComponentsModule in shared.module.ts to have access to all components, directives, pipes.
 * import EntryComponentsModule.forRoot() in app.module.ts to register root module providers.
 */
@NgModule({
  declarations: [],
  exports: [
    EntryButtonModule,
    EntryCommonModule,
    EntryDialogModule,
    EntryFileInputModule,
    EntryValidationModule,
    EntryPermissionModule,
    EntrySearchFilterModule,
    EntrySpinnerModule,
    EntryTableModule
  ]
})
export class EntryComponentsModule {
  static forRoot(options: EntryComponentsModuleOptions = {}): ModuleWithProviders<EntryComponentsModule> {

    const permissionServiceProvider: Provider[] = options.permissionService
      ? [{ provide: EntryPermissionService, useClass: options.permissionService }]
      : [];

    const providers: Provider[] = [...permissionServiceProvider, ...NG_EVENT_PLUGINS];
    return {
      ngModule: EntryComponentsModule,
      providers
    };
  }
}
