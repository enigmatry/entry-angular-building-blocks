import { Component, Input, inject } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ]
})
export class DateTimeSearchFilterComponent<D> {
  @Input() searchFilter: DateTimeSearchFilter<D>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;
}
