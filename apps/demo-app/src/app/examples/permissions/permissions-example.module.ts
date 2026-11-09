import { NgModule } from '@angular/core';
import { EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { PermissionExampleService } from './permissions-example/permission.service';
import { PermissionsExampleComponent } from './permissions-example/permissions-example.component';

@NgModule({
  imports: [
    PermissionsExampleComponent
  ],
  exports: [
    PermissionsExampleComponent
  ],
  providers: [{
    provide: EntryPermissionService, useClass: PermissionExampleService
  }]
})
export class PermissionsExampleModule { }
