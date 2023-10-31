import { NgModule } from '@angular/core';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services';
import { FormlyAutocompleteModule } from './autocomplete/formly-autocomplete.module';

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
