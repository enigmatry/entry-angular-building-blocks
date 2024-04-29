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
import { InputExampleComponent } from './input/input-example.component';
import { SelectExampleComponent } from './select/select-example.component';
import { TextareaExampleComponent } from './textarea/textarea-example.component';
import { CheckboxExampleComponent } from './checkbox/checkbox-example.component';
import { RadioExampleComponent } from './radio/radio-example.component';
import { ProductsGeneratedModule } from './form-example/generated/products-generated.module';
import { RichTextExampleComponent } from './rich-text/rich-text-example.component';
import { ENTRY_CKEDITOR_OPTIONS, FormlyCkeditorModule } from '@enigmatry/entry-form/ckeditor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormlyDateTimePickerModule } from '@enigmatry/entry-form/date-time-picker';
import { DateTimePickerExampleComponent } from './date-time-picker/date-time-picker-example.component';

@NgModule({
  declarations: [
    FormExampleComponent,
    InputExampleComponent,
    SelectExampleComponent,
    TextareaExampleComponent,
    CheckboxExampleComponent,
    RadioExampleComponent,
    RichTextExampleComponent,
    DateTimePickerExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsGeneratedModule,
    FormlyMaterialModule,
    FormlyAutocompleteModule,
    FormlyMatDatepickerModule,
    FormlyCkeditorModule,
    FormlyDateTimePickerModule,
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
    FormExampleComponent,
    InputExampleComponent,
    SelectExampleComponent,
    TextareaExampleComponent,
    CheckboxExampleComponent,
    RadioExampleComponent,
    RichTextExampleComponent,
    DateTimePickerExampleComponent
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    {
      provide: ENTRY_CKEDITOR_OPTIONS,
      useValue: {
        build: ClassicEditor,
        config: {
          toolbar: ['bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote', 'link']
        }
      }
    }
  ]
})
export class FormExampleModule { }
