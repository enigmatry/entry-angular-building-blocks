import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { SharedModule } from '../../shared/shared.module';
import { PermissionsExampleModule } from '../../examples/permissions/permissions-example.module';

@NgModule({
  declarations: [
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PermissionsExampleModule,
    PermissionsRoutingModule
  ]
})
export class PermissionsModule { }
