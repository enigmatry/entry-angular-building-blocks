import { NgModule } from '@angular/core';
import { FormlyComponentsModule } from './components';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services/form-type.resolver';

@NgModule({
  declarations: [
  ],
  imports: [
    FormlyComponentsModule
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
