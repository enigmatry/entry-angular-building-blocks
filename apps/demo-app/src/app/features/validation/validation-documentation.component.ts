import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormlyValidationExampleModule } from '../../examples/validation/formly/formly-validation-example.module';
import { ReactiveFormValidationExampleModule } from '../../examples/validation/reactive-form/reactive-form-validation-example.module';

@Component({
  standalone: true,
  templateUrl: './validation-documentation.component.html',
  imports: [
    SharedModule,
    ReactiveFormValidationExampleModule,
    FormlyValidationExampleModule
  ]
})
export class ValidationDocumentationComponent { }
