import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Field, ValidationError } from '@angular/forms/signals';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { ENTRY_MAT_DATE_TIME_FORMATS, EntryDateTimeAdapter } from '@enigmatry/entry-components/common';
import { ENTRY_SEARCH_FILTER_CONFIG } from '../search-filter-config.model';
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
  private readonly config = inject(ENTRY_SEARCH_FILTER_CONFIG);

  readonly searchFilter = input.required<DateTimeSearchFilter<D>>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<Date | null>>();

  protected readonly errorMessage = (error: ValidationError): string => error.message ?? this.config.invalidDateMessage;
}
