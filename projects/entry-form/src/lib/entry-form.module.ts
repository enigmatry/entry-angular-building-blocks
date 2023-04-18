import { NgModule } from '@angular/core';
import { FormlyComponentsModule } from './components';
import { ENTRY_FIELD_TYPE_RESOLVER, fieldTypeResolverFactory, FieldTypeResolverService } from './services';

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
