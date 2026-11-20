import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryCommonModule, NG_EVENT_PLUGINS } from '@enigmatry/entry-components/common';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';
import { EntryPermissionModule, EntryPermissionService, PermissionType } from '@enigmatry/entry-components/permissions';
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
import { EntrySpinnerModule } from '@enigmatry/entry-components/spinner';
import { EntryTableModule } from '@enigmatry/entry-components/table';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';

interface EntryComponentsModuleOptions<T extends PermissionType> {
  permissionService?: Type<EntryPermissionService<T>>;
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
  static readonly forRoot = <T extends PermissionType>(options: EntryComponentsModuleOptions<T> = {}): ModuleWithProviders<EntryComponentsModule> => {
    const permissionServiceProvider: Provider[] = options.permissionService
      ? [{ provide: EntryPermissionService, useClass: options.permissionService }]
      : [];

    const providers: Provider[] = [...permissionServiceProvider, ...NG_EVENT_PLUGINS];
    return {
      ngModule: EntryComponentsModule,
      providers
    };
  };
}
