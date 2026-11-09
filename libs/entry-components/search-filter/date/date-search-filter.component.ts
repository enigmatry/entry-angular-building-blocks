import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Field, ValidationError, FormField } from '@angular/forms/signals';
import { MatDatepicker, MatDatepickerInput, MatDatepickerToggle } from '@angular/material/datepicker';
import { MatError, MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ENTRY_SEARCH_FILTER_CONFIG } from '../search-filter-config.model';
import { DateSearchFilter } from './date-search-filter.model';

@Component({
    selector: 'entry-date-search-filter',
    templateUrl: './date-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, MatFormField, MatLabel, MatError, MatSuffix, MatInput, MatDatepicker, MatDatepickerInput, MatDatepickerToggle]
})
export class DateSearchFilterComponent<D extends Date> {
  private readonly config = inject(ENTRY_SEARCH_FILTER_CONFIG);

  readonly searchFilter = input.required<DateSearchFilter<D>>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<Date | null>>();

  protected readonly errorMessage = (error: ValidationError): string => error.message ?? this.config.invalidDateMessage;
}
