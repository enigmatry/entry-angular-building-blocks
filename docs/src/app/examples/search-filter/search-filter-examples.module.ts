import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';
import { SharedModule } from '../../shared/shared.module';
import { EntrySearchFilterModule } from 'projects/entry-components/search-filter/entry-search-filter.module';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from 'projects/entry-components/search-filter/public-api';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    SearchFilterExampleComponent
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
    {
      provide: ENTRY_SEARCH_FILTER_CONFIG,
      useFactory: () => new EntrySearchFilterConfig({
        applyButtonText: 'Filter'
      })
    }
  ]
})
export class SearchFilterExamplesModule { }
