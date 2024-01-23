import { Component, Input } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { EntryDateTimeAdapter } from './entry-date-time-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EXTENDED_DATE_FORMATS } from './entry-date-time-formats';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: EXTENDED_DATE_FORMATS },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ]
})
export class DateTimeSearchFilterComponent<D> {
  @Input() searchFilter: DateTimeSearchFilter<D>;
  @Input() form: UntypedFormGroup;
}
