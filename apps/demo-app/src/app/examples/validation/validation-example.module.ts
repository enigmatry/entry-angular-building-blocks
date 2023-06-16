import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryValidationModule, FORM_FIELD_ERROR_KEY } from '@enigmatry/entry-components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { ValidationExampleComponent } from './reactive-form-validation/reactive-form-validation-example.component';
import { FormlyFormValidationExampleComponent } from './formly-form-validation/formly-form-validation-example.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

@NgModule({
  declarations: [
    ValidationExampleComponent,
    FormlyFormValidationExampleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EntryValidationModule,
    FormlyMaterialModule,
    // FormlyModule.forChild({
    //   validationMessages: [
    //       { name: FORM_FIELD_ERROR_KEY, message: (error, _) => error }
    //   ]
    // })
  ],
  exports: [
    ValidationExampleComponent,
    FormlyFormValidationExampleComponent
  ]
})
export class ValidationExampleModule { }
