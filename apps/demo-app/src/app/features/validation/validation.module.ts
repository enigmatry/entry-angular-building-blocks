import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';
import { ValidationComponent } from './validation.component';
import { SharedModule } from '../../shared/shared.module';
import { FormlyValidationExampleModule } from '../../examples/validation/formly/formly-validation-example.module';
import { ReactiveFormValidationExampleModule } from '../../examples/validation/reactive-form/reactive-form-validation-example.module';

@NgModule({
  declarations: [
    ValidationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ValidationRoutingModule,
    ReactiveFormValidationExampleModule,
    FormlyValidationExampleModule
  ]
})
export class ValidationModule { }
