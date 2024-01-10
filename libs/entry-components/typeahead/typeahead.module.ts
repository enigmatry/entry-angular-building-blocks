import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntryTypeaheadComponent } from './typeahead.component';

@NgModule({
  declarations: [
    EntryTypeaheadComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EntryTypeaheadComponent
  ]
})
export class EntryTypeaheadModule { }
