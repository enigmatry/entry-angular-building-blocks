import { Component } from '@angular/core';
import { FormExampleModule } from '../../examples/form/form-example.module';
import { SharedModule } from '../../shared/shared.module';

@Component({
  standalone: true,
  templateUrl: './form-documentation.component.html',
  imports: [
    SharedModule,
    FormExampleModule,
  ]
})
export class FormDocumentationComponent { }
