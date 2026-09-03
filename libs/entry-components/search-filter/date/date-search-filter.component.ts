import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { DateSearchFilter } from './date-search-filter.model';

@Component({
    selector: 'entry-date-search-filter',
    templateUrl: './date-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DateSearchFilterComponent<D extends Date> {
  readonly searchFilter = input.required<DateSearchFilter<D>>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<Date | null>>();
}
