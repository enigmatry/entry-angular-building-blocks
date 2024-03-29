import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexFormlyFormValidationExampleComponent }
  from './complex-formly-form-validation/complex-formly-form-validation-example.component';
import { FieldSetComponent } from './complex-formly-form-validation/field-set.component';
import { RepeatNameComponent } from './complex-formly-form-validation/repeat-name.component';
import { FormlyFormValidationExampleComponent } from './formly-form-validation/formly-form-validation-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntryValidationModule, FORM_FIELD_ERROR_KEY } from '@enigmatry/entry-components/validation';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { SharedModule } from '../../../shared/shared.module';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';

@NgModule({
  declarations: [
    FormlyFormValidationExampleComponent,
    ComplexFormlyFormValidationExampleComponent,
    FieldSetComponent,
    RepeatNameComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyMaterialModule,
    FormlyModule.forChild({
      validationMessages: [
          /** Map form fields server side validation errors to FORM_FIELD_ERROR_KEY key */
          { name: FORM_FIELD_ERROR_KEY, message: (error, _) => error },
          /** Map form fields client side validation errors */
          { name: 'required', message: 'Required field.' },
          { name: 'minlength', message: (_, config: FormlyFieldConfig) =>
            `Minimal length is ${config.formControl.errors.minlength.requiredLength}` }
      ],
      types: [
        { name: 'field-set', component: FieldSetComponent },
        { name: 'repeat-name', component: RepeatNameComponent },
      ]
    })
  ],
  exports: [
    FormlyFormValidationExampleComponent,
    ComplexFormlyFormValidationExampleComponent
  ]
})
export class FormlyValidationExampleModule { }
