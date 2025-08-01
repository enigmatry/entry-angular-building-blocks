import { NgModule } from '@angular/core';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services';

@NgModule({
  declarations: [
  ],
  imports: [
    FormlyAutocompleteModule
  ],
  providers: [
    {
      provide: ENTRY_FIELD_TYPE_RESOLVER,
      useFactory: fieldTypeResolverFactory,
      deps: [FieldTypeResolverService]
    }
  ]
})
export class EntryFormModule { }
