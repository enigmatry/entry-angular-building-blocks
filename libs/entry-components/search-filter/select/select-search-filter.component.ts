import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from '../search-filter-config.model';
import { SelectSearchFilter } from './select-search-filter.model';

@Component({
    selector: 'entry-select-search-filter',
    templateUrl: './select-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SelectSearchFilterComponent<T> {
  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  readonly searchFilter = input.required<SelectSearchFilter<T>>();
  /** Form group to which the search-filter input component will be added. */
  readonly form = input.required<UntypedFormGroup>();

  public readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);
}
