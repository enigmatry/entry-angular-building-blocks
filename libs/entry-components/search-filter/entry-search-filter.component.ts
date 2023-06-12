import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, UntypedFormGroup } from '@angular/forms';
import { SearchFilterParams } from './search-filter-params.type';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import { FilterInputControlType } from './models/filter-input-control-type.model';
import { SearchFilterBase, SelectSearchFilter } from './public-api';

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
      const formControl = this.toFormControl(searchFilter);
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;
    });
    return new UntypedFormGroup(group);
  }

  private toFormControl(searchFilter: SearchFilterBase<any>): FormControl {
    switch (searchFilter.controlType) {
      case FilterInputControlType.text:
        return new FormControl<string>(searchFilter.value || '');
      case FilterInputControlType.select:
      case FilterInputControlType.dynamicSelect:
        return new FormControl<any | [] | undefined>(
          (searchFilter as SelectSearchFilter).multiSelect
            ? searchFilter.value ?? []
            : searchFilter.value || undefined);
      default: throw new Error(`FormControl not defined for '${searchFilter.controlType}' filter type`);
    }
  }
}
