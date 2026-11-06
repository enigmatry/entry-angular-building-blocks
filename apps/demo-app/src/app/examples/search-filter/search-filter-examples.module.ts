import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { EntrySearchFilterModule, provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
import { SharedModule } from '../../shared/shared.module';
import { DynamicSearchFilterExampleComponent } from './dynamic-search-filter/dynamic-search-filter-example.component';
import { EnumToStringPipe } from './search-filter/enum-to-string.pipe';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';

@NgModule({
  declarations: [
    SearchFilterExampleComponent,
    DynamicSearchFilterExampleComponent,
    EnumToStringPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    EntrySearchFilterModule,
    MatTableModule
  ],
  exports: [
    SearchFilterExampleComponent,
    DynamicSearchFilterExampleComponent
  ],
  providers: [
    provideEntrySearchFilterConfig({
      applyButtonText: 'Filter'
    })
  ]
})
export class SearchFilterExamplesModule { }
