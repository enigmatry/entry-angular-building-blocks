import { NgModule } from '@angular/core';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services';

@NgModule({
  declarations: [
  ],
  imports: [
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
