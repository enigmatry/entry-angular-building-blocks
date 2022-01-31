import { NgModule } from '@angular/core';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';
import { ServerValidationMessagesComponent } from './server-validation/server-validation-messages.component';
import { ServerValidationModule } from './server-validation/server-validation.module';

@NgModule({
  declarations: [],
  imports: [
    FormlyAutocompleteModule,
    ServerValidationModule
  ],
  exports: [
    ServerValidationMessagesComponent
  ]
})
export class EnigmatryFormlyExtensionsModule { }
