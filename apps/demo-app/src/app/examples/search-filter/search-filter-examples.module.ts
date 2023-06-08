import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';
import { SharedModule } from '../../shared/shared.module';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig, EntrySearchFilterModule } from '@enigmatry/entry-components/search-filter';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';


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
