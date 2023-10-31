import { ModuleWithProviders, NgModule, Provider, Type } from '@angular/core';
import { EntryButtonModule } from '@enigmatry/entry-components/button';
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
import { EntryPermissionModule, EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
import { EntryFileInputModule } from '@enigmatry/entry-components/file-input';

interface ModuleForRootOptions {
  permissionService?: Type<any>;
}

@NgModule({
  declarations: [],
  exports: [
    EntryButtonModule,
    EntryDialogModule,
    EntryFileInputModule,
    EntryValidationModule,
    EntryPermissionModule,
    EntrySearchFilterModule
  ],
  providers: []
})
export class EntryComponentsModule {
  static forRoot(options: ModuleForRootOptions = {}): ModuleWithProviders<EntryComponentsModule> {
    const providers: Provider[] = options.permissionService
      ? [{
        provide: EntryPermissionService,
        useClass: options.permissionService
      }]
      : [];

    return {
      ngModule: EntryComponentsModule,
      providers
    };
  }
}
