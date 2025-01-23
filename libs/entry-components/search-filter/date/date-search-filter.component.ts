import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { DateSearchFilter } from './date-search-filter.model';

@Component({
    selector: 'entry-date-search-filter',
    templateUrl: './date-search-filter.component.html',
    standalone: false
})
export class DateSearchFilterComponent<D> {
  @Input() searchFilter: DateSearchFilter<D>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;
}
