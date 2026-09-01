import { Component, input } from '@angular/core';
import { FormRecord } from '@angular/forms';
import { DateSearchFilter } from './date-search-filter.model';

@Component({
    selector: 'entry-date-search-filter',
    templateUrl: './date-search-filter.component.html',
    standalone: false
})
export class DateSearchFilterComponent<D> {
  readonly searchFilter = input.required<DateSearchFilter<D>>();
  /** Form group to which the search-filter input component will be added. */
  readonly form = input.required<FormRecord>();
}
