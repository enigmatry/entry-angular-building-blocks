import { ChangeDetectionStrategy, Component, Inject, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ControlType } from './control-type.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from '../search-filter-config.model';
import { SearchFilterBase } from './search-filter-base.model';

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

  controlType = ControlType;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }
}
