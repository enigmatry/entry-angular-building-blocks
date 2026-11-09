import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Field, FormField } from '@angular/forms/signals';
import { MatOptgroup, MatOption } from '@angular/material/core';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { GroupSelectOptionsPipe } from '../group-select-options.pipe';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from '../search-filter-config.model';
import { SelectSearchFilter } from './select-search-filter.model';

@Component({
    selector: 'entry-select-search-filter',
    templateUrl: './select-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormField, MatFormField, MatLabel, MatError, MatSelect, MatOption, MatOptgroup, GroupSelectOptionsPipe]
})
export class SelectSearchFilterComponent<T> {
  protected readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);

  readonly searchFilter = input.required<SelectSearchFilter<T>>();
  /** The field this filter edits, taken from the search filter form. */
  readonly field = input.required<Field<unknown>>();
}
