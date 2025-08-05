import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EntryPermissionModule, EntryPermissionService } from '@enigmatry/entry-components/permissions';
import { PermissionExampleService } from './permissions-example/permission.service';
import { PermissionsExampleComponent } from './permissions-example/permissions-example.component';

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
