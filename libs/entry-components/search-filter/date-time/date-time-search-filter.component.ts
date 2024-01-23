import { Component, Input } from '@angular/core';
import { DateTimeSearchFilter } from './date-time-search-filter.model';
import { UntypedFormGroup } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { EXTEND_MAT_DATE_FORMAT_WITH_DATE_TIME, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';

@Component({
  selector: 'entry-date-time-search-filter',
  templateUrl: './date-time-search-filter.component.html',
  providers: [
    { provide: MAT_DATE_FORMATS, useFactory: EXTEND_MAT_DATE_FORMAT_WITH_DATE_TIME },
    { provide: DateAdapter, useClass: EntryDateTimeAdapter }
  ]
})
export class DateTimeSearchFilterComponent<D> {
  @Input() searchFilter: DateTimeSearchFilter<D>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;
}
