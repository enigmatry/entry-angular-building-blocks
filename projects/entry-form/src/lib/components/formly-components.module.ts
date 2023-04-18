import { NgModule } from '@angular/core';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';
import { FormlyCkeditorModule } from './ckeditor/formly-ckeditor.module';

@NgModule({
  declarations: [],
  imports: [
    FormlyAutocompleteModule,
    FormlyCkeditorModule
  ]
})
export class FormlyComponentsModule { }
