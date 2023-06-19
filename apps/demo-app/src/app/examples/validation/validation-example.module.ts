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
import { FieldSetComponent } from './complex-formly-form-validation/field-set.component';
import { RepeatNameComponent } from './complex-formly-form-validation/repeat-name.component';

@NgModule({
  declarations: [
    ReactiveFormExampleComponent,
    FormlyFormValidationExampleComponent,
    ComplexFormlyFormValidationExampleComponent,
    FieldSetComponent,
    RepeatNameComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyMaterialModule,
    FormlyModule.forChild({
      validationMessages: [
          /** Map form fields server side validation errors to FORM_FIELD_ERROR_KEY key */
          { name: FORM_FIELD_ERROR_KEY, message: (error, _) => error },
          { name: 'required', message: 'Required field.' }
      ],
      types: [
        { name: 'field-set', component: FieldSetComponent },
        { name: 'repeat-name', component: RepeatNameComponent },
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
