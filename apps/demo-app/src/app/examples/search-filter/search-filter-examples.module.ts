import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EntrySearchFilterModule, provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
import { SharedModule } from '../../shared/shared.module';
import { EnumToStringPipe } from './search-filter/enum-to-string.pipe';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';

@NgModule({
  declarations: [
    SearchFilterExampleComponent,
    EnumToStringPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntrySearchFilterModule,
    MatTableModule
  ],
  exports: [
    SearchFilterExampleComponent
  ],
  providers: [
    provideEntrySearchFilterConfig({
      applyButtonText: 'Filter'
    })
  ]
})
export class SearchFilterExamplesModule { }
