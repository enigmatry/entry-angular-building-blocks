import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeaheadExampleComponent } from './typeahead-example/typeahead-example.component';
import { EntryTypeaheadModule } from '@enigmatry/entry-components/typeahead';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    TypeaheadExampleComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntryTypeaheadModule
  ],
  exports: [
    TypeaheadExampleComponent
  ],
})
export class TypeaheadExampleModule { }
