import { NgModule } from '@angular/core';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';
import { ServerValidationModule } from './server-validation/server-validation.module';

@NgModule({
  declarations: [],
  imports: [
    FormlyAutocompleteModule,
    ServerValidationModule
  ],
  exports: [
  ]
})
export class EnigmatryFormlyExtensionsModule { }
