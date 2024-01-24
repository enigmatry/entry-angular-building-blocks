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
    }),
    {
      provide: DateAdapter,
      useClass: DateFnsAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    {
      provide: ENTRY_MAT_DATE_TIME,
      useValue: {
        matDateFormats: {
          parse: {
            dateInput: ['dd-MM-yyyy', 'dd-MM-yyyy HH', 'dd-MM-yyyy HH:mm'],
          },
          display: {
            dateInput: 'dd-MM-yyyy HH:mm',
            monthYearLabel: 'LLL uuuu',
            dateA11yLabel: 'PP',
            monthYearA11yLabel: 'LLLL uuuu',
          },
        },
        compareDate(first: Date, second: Date): number {
          return first.getTime() - second.getTime();
        }
      }
    }
  ]
})
export class SearchFilterExamplesModule { }
