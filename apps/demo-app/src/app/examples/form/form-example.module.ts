import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormExampleComponent } from './form-example/form-example.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyMatDatepickerModule } from '@ngx-formly/material/datepicker';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FormlyAutocompleteModule } from '@enigmatry/entry-form/autocomplete';

@NgModule({
  declarations: [
    FormExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyMaterialModule,
    FormlyAutocompleteModule,
    FormlyMatDatepickerModule,
    FormlyModule.forChild({
      types: [
        {
          name: 'checkbox',
          wrappers: [],
          defaultOptions: {
            templateOptions: {
              indeterminate: false
            }
          }
        }
      ],
      validationMessages: [
        { name: 'required', message: 'This field is required' }
      ]
    })
  ],
  exports: [
    FormExampleComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
  ]
})
export class FormExampleModule { }
