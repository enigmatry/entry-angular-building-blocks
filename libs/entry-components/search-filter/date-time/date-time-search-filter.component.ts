import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';
import { DateTimeSearchFilter } from './date-time-search-filter.model';

@Component({
    selector: 'entry-date-time-search-filter',
    templateUrl: './date-time-search-filter.component.html',
    providers: [
        { provide: MAT_DATE_FORMATS, useFactory: () => inject(ENTRY_MAT_DATE_TIME_FORMATS) },
        { provide: DateAdapter, useClass: EntryDateTimeAdapter }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DateTimeSearchFilterComponent<D extends Date> {
  readonly searchFilter = input.required<DateTimeSearchFilter<D>>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<Date | null>>();
}
