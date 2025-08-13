import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { AutocompleteSearchFilter } from './autocomplete/autocomplete-search-filter.model';
import { ControlType } from './control-type';
import { DateSearchFilter } from './date/date-search-filter.model';
import { DateTimeSearchFilter } from './date-time/date-time-search-filter.model';
import { SearchFilterBase } from './search-filter-base.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import { SearchFilterParams } from './search-filter-params.type';
import { SelectSearchFilter } from './select/select-search-filter.model';
import { SelectOption } from './select-option.model';
import { TextSearchFilter } from './text/text-search-filter.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Entry SearchFilter component.
 */
@Component({
    selector: 'entry-search-filter',
    templateUrl: './entry-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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
  readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);
  private _destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.searchFilterForm = this.toFormGroup(this.searchFilters);
  }

  onSubmit() {
    const formValue = this.searchFilterForm.value;
    this.searchFilterChange.emit(formValue);
  }

  toFormGroup = (searchFilters: SearchFilterBase<any>[]) => {
    const group: any = {};
    searchFilters.forEach(searchFilter => {
      const formControl = searchFilter.toFormControl();
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;

      if (searchFilter.formatValue) {
        formControl.valueChanges
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe(value => {
            const formatted = searchFilter.formatValue?.(value);
            formControl.setValue(formatted, { emitEvent: false });
          });
      }
    });
    return new UntypedFormGroup(group);
  };

  asTextSearchFilter = (searchFilter: SearchFilterBase<any>): TextSearchFilter => searchFilter as TextSearchFilter;

  asSelectSearchFilter = <T>(searchFilter: SearchFilterBase<T>): SelectSearchFilter<T> => searchFilter as SelectSearchFilter<T>;

  asAutocompleteSearchFilter = <T>(searchFilter: SearchFilterBase<SelectOption<T>>): AutocompleteSearchFilter<T> => searchFilter as AutocompleteSearchFilter<T>;

  asDateTimeSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateTimeSearchFilter<T> => searchFilter as DateTimeSearchFilter<T>;

  asDateSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateSearchFilter<T> => searchFilter as DateSearchFilter<T>;
}

