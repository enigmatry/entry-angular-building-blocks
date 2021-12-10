import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ENIGMATRY_FIELD_TYPE_RESOLVER, FieldTypeResolverService, fieldTypeResolverFactory } from './form-type.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: ENIGMATRY_FIELD_TYPE_RESOLVER,
      useFactory: fieldTypeResolverFactory,
      deps: [FieldTypeResolverService]
    }
  ]
})
export class EnigmatryFormModule { }
