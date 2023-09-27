import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionsExampleComponent } from './permissions-example/permissions-example.component';
import { EntryPermissionModule, EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { PermissionExampleService } from './permissions-example/permission.service';

@NgModule({
  declarations: [
    PermissionsExampleComponent
  ],
  imports: [
    CommonModule,
    EntryPermissionModule
  ],
  exports: [
    PermissionsExampleComponent
  ],
  providers: [{
    provide: EntryPermissionService, useClass: PermissionExampleService
  }]
})
export class PermissionsExampleModule { }
