import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ControlType } from './control-type.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from '../search-filter-config.model';
import { SearchFilterBase } from './search-filter-base.model';
import { SelectSearchFilter } from './inputs/select-search-filter.model';
import { TextSearchFilter } from '../public-api';

@Component({
  selector: 'entry-search-filter-input',
  templateUrl: './search-filter-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrySearchFilterInputComponent<T> {
  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  @Input() searchFilter: SearchFilterBase<T>;
  /** Form group to which the search-filter input component will be added. */
  @Input() form: UntypedFormGroup;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }

  get textSearchFilter(): TextSearchFilter | undefined {
    return this.searchFilter.controlType === ControlType.text && this.searchFilter as TextSearchFilter;
  }
  get selectSearchFilter(): SelectSearchFilter<T> | undefined {
    return this.searchFilter.controlType === ControlType.select && this.searchFilter as SelectSearchFilter<T>;
  }
}
