import { NgModule } from '@angular/core';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services';
import { StandardEntryComponentsModule } from './components/standard-entry-components.module';

@NgModule({
  declarations: [
  ],
  imports: [
    StandardEntryComponentsModule
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
