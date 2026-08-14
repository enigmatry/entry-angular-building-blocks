import { ChangeDetectionStrategy, Component, DestroyRef, inject, input, output } from '@angular/core';
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

  private built: { keys: string; filters: SearchFilterBase<any>[]; form: UntypedFormGroup } | undefined;

  /**
   * The filters the form was actually built from. The template iterates this rather than the input
   * so the rendered controls and the form can never disagree.
   */
  get renderedSearchFilters(): SearchFilterBase<any>[] {
    return this.build().filters;
  }

  /** Form group holding one control per search filter. Replaces the previous ngOnInit assignment. */
  get searchFilterForm(): UntypedFormGroup {
    return this.build().form;
  }

  /**
   * Rebuilds only when the set of filter keys changes.
   *
   * @remarks Keyed on the keys rather than the array identity, because both extremes are wrong.
   * Rebuilding on identity - what a `computed` does - discards whatever the user typed on every
   * change detection pass for a caller binding `[searchFilters]="getFilters()"`, since
   * `toFormGroup` mints new controls, writes them back onto the filter models and subscribes per
   * run. Building strictly once instead loses filters that arrive after the first render, which is
   * the normal shape for a set assembled in an HTTP callback - and loses them silently, because the
   * template renders this snapshot.
   *
   * Same keys, different instances: the first instances win, so a re-bound filter's `label` or
   * `placeholder` change is not picked up. Changing the key set is the supported way to swap filters.
   */
  private readonly build = (): { keys: string; filters: SearchFilterBase<any>[]; form: UntypedFormGroup } => {
    const filters = this.searchFilters();
    const keys = filters.map(searchFilter => searchFilter.key).join('|');

    if (this.built?.keys !== keys) {
      this.built = { keys, filters, form: this.toFormGroup(filters) };
    }
    return this.built;
  };

  controlType = ControlType;
  readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);
  private destroyRef = inject(DestroyRef);

  readonly onSubmit = (): void => {
    const formValue = this.searchFilterForm.value;
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
