import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { DynamicFormExampleModule } from '../../examples/dynamic-form/dynamic-form-example.module';

@Component({
  standalone: true,
  templateUrl: './dynamic-form-documentation.component.html',
  imports: [
    SharedModule,
    DynamicFormExampleModule,
  ]
})
export class DynamicFormDocumentationComponent { }
