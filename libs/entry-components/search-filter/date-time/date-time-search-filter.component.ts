import { Component, Input } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { EntryDateAdapter } from './entry-date-adapter';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EXTENDED_DATE_FORMATS } from './entry-date-formats';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: EXTENDED_DATE_FORMATS },
    { provide: DateAdapter, useClass: EntryDateAdapter }
  ]
})
export class DateTimeSearchFilterComponent {
  @Input() searchFilter: DateTimeSearchFilter;
  @Input() form: UntypedFormGroup;
}
