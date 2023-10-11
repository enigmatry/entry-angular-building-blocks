import { Component } from '@angular/core';
import { PermissionsExampleModule } from '../../examples/permissions/permissions-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  templateUrl: './permissions-documentation.component.html',
  imports: [
    SharedModule,
    PermissionsExampleModule,
  ]
})
export class PermissionsDocumentationComponent { }
