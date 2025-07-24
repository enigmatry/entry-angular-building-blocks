import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
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
  @Input() searchFilter: SelectSearchFilter<T>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }
}
