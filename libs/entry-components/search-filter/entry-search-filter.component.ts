import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, input, output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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

/**
 * Entry SearchFilter component.
 */
@Component({
    selector: 'entry-search-filter',
    templateUrl: './entry-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntrySearchFilterComponent {
  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  readonly searchFilters = input<SearchFilterBase<any>[]>([]);
  /**
   * Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results.
   */
  readonly searchFilterChange = output<SearchFilterParams>();

  /**
   * Replaces the previous ngOnInit assignment. Evaluated lazily on first template read, so the
   * filters input is already set, and rebuilt if a different set of filters is bound - which the
   * ngOnInit version ignored.
   *
   * @remarks `toFormGroup` is not pure: it writes each control back onto its filter model and
   * subscribes for value formatting. That is tolerated here because the computation runs once per
   * distinct `searchFilters` value, and the subscriptions are bounded by `takeUntilDestroyed`.
   */
  readonly searchFilterForm = computed<UntypedFormGroup>(() => this.toFormGroup(this.searchFilters()));

  controlType = ControlType;
  readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);
  private destroyRef = inject(DestroyRef);

  readonly onSubmit = (): void => {
    const formValue = this.searchFilterForm().value;
    this.searchFilterChange.emit(formValue);
  };

  toFormGroup = (searchFilters: SearchFilterBase<any>[]) => {
    const group: any = {};
    searchFilters.forEach(searchFilter => {
      const formControl = searchFilter.toFormControl();
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;

      if (searchFilter.formatValue) {
        formControl.valueChanges
          .pipe(takeUntilDestroyed(this.destroyRef))
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

  asAutocompleteSearchFilter = <T>(searchFilter: SearchFilterBase<SelectOption<T>>): AutocompleteSearchFilter<T> =>
    searchFilter as AutocompleteSearchFilter<T>;

  asDateTimeSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateTimeSearchFilter<T> => searchFilter as DateTimeSearchFilter<T>;

  asDateSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateSearchFilter<T> => searchFilter as DateSearchFilter<T>;
}
