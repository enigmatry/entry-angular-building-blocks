import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { SearchFilterBase } from './search-filter-base';
import { SearchFilterParams } from './search-filter-params';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';

/**
 * Entry SearchFilter component.
 */
@Component({
  selector: 'entry-search-filter',
  templateUrl: './entry-search-filter.component.html',
  styleUrls: ['./entry-search-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntrySearchFilterComponent implements OnInit {

  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  @Input() searchFilters: SearchFilterBase<string>[] = [];
  /**
   * Emits the change in SearchFilterParams so the containing component can apply them and retreive the filtered results.
   */
  @Output() searchFilterChange = new EventEmitter<SearchFilterParams>();

  searchFilterForm!: UntypedFormGroup;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }

  ngOnInit() {
    this.searchFilterForm = this.toFormGroup(this.searchFilters);
  }

  onSubmit() {
    const formValue = this.searchFilterForm.value;
    this.searchFilterChange.emit(formValue);
  }

  toFormGroup(searchFilters: SearchFilterBase<string>[]) {
    const group: any = {};

    searchFilters.forEach(searchFilter => {
      const formControl = new UntypedFormControl(searchFilter.value || '');
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;
    });
    return new UntypedFormGroup(group);
  }
}
