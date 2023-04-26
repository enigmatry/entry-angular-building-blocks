import { NgModule } from '@angular/core';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';
import { FormlyCkeditorModule } from './ckeditor/formly-ckeditor.module';
import { FormlyDateTimePickerModule } from './date-time-picker/formly-date-time-picker.module';

@NgModule({
  declarations: [],
  imports: [
    FormlyAutocompleteModule,
    FormlyCkeditorModule,
    FormlyDateTimePickerModule
  ]
})
export class FormlyComponentsModule { }
