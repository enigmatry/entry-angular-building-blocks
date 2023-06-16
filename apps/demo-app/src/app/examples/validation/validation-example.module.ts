import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryValidationModule, FORM_FIELD_ERROR_KEY } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormExampleComponent } from './reactive-form-validation/reactive-form-validation-example.component';
import { FormlyFormValidationExampleComponent } from './formly-form-validation/formly-form-validation-example.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { ComplexFormlyFormValidationExampleComponent }
from './complex-formly-form-validation/complex-formly-form-validation-example.component';

@NgModule({
  declarations: [
    ReactiveFormExampleComponent,
    FormlyFormValidationExampleComponent,
    ComplexFormlyFormValidationExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyMaterialModule,
    /**
     * Formly requires configuring filed validation message mappers to be configured!
     */
    FormlyModule.forChild({
      validationMessages: [
          { name: FORM_FIELD_ERROR_KEY, message: (error, _) => error }
      ]
    })
  ],
  exports: [
    ReactiveFormExampleComponent,
    FormlyFormValidationExampleComponent,
    ComplexFormlyFormValidationExampleComponent
  ]
})
export class ValidationExampleModule { }
