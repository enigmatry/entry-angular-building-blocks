import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { SearchFilterParams } from './search-filter-params.type';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import { SearchFilterBase } from './search-filter-base.model';
import { TextSearchFilter } from './text-search-filter/text-search-filter.model';
import { SelectSearchFilter } from './select-search-filter/select-search-filter.model';
import { AutocompleteSearchFilter } from './autocomplete-search-filter/autocomplete-search-filter.model';
import { ControlType } from './control-type';

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
  @Input() searchFilters: SearchFilterBase<any>[] = [];
  /**
   * Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results.
   */
  @Output() searchFilterChange = new EventEmitter<SearchFilterParams>();

  searchFilterForm!: UntypedFormGroup;
  controlType = ControlType;

  constructor(@Inject(ENTRY_SEARCH_FILTER_CONFIG) public config: EntrySearchFilterConfig) { }

  ngOnInit() {
    this.searchFilterForm = this.toFormGroup(this.searchFilters);
  }

  onSubmit() {
    const formValue = this.searchFilterForm.value;
    this.searchFilterChange.emit(formValue);
  }

  toFormGroup(searchFilters: SearchFilterBase<any>[]) {
    const group: any = {};
    searchFilters.forEach(searchFilter => {
      const formControl = searchFilter.toFormControl();
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;
    });
    return new UntypedFormGroup(group);
  }

  asTextSearchFilter(searchFilter: SearchFilterBase<any>): TextSearchFilter {
    return searchFilter as TextSearchFilter;
  }
  asSelectSearchFilter<T>(searchFilter: SearchFilterBase<T>): SelectSearchFilter<T> {
    return searchFilter as SelectSearchFilter<T>;
  }

  asAutocompleteSearchFilter<T>(searchFilter: SearchFilterBase<T>): AutocompleteSearchFilter<T>{
    return searchFilter as AutocompleteSearchFilter<T>;
  }
}

