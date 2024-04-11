import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterExampleComponent } from './search-filter/search-filter-example.component';
import { SharedModule } from '../../shared/shared.module';
import { EntrySearchFilterModule, provideEntrySearchFilterConfig } from '@enigmatry/entry-components/search-filter';
import { MatTableModule } from '@angular/material/table';
import { EnumToStringPipe } from './search-filter/enum-to-string.pipe';
import { DateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME } from '@enigmatry/entry-components/common';

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
