import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, output, Signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, FormRecord } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  readonly controlType = ControlType;
  readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);
  private readonly destroyRef = inject(DestroyRef);

  /** Torn down and replaced on every rebuild, so old controls do not keep formatting subscriptions alive. */
  private formatSubscriptions = new Subscription();

  /**
   * The input, but only changing identity when the set of filter keys does. Rebuilding on array
   * identity would discard whatever the user typed whenever a caller binds `[searchFilters]="getFilters()"`,
   * since `toFormGroup` mints new controls; building strictly once would silently drop filters that
   * arrive after the first render.
   */
  private readonly stableFilters = computed(() => this.searchFilters(), {
    equal: (a, b) => a.length === b.length && a.every((filter, i) => filter.key === b[i].key)
  });

  private readonly built = computed(() => {
    const filters = this.stableFilters();

    this.formatSubscriptions.unsubscribe();
    this.formatSubscriptions = new Subscription();

    return { filters, form: this.toFormGroup(filters) };
  });

  /**
   * The filters the form was actually built from. The template iterates this rather than the input
   * so the rendered controls and the form can never disagree.
   */
  readonly renderedSearchFilters: Signal<SearchFilterBase<any>[]> = computed(() => this.built().filters);

  /**
   * Form group holding one control per search filter. A `FormRecord` rather than a `FormGroup`,
   * because the keys come from the bound filters and are not known at compile time.
   */
  readonly searchFilterForm: Signal<FormRecord> = computed(() => this.built().form);

  readonly onSubmit = (): void => {
    this.searchFilterChange.emit(this.searchFilterForm().value);
  };

  readonly toFormGroup = (searchFilters: SearchFilterBase<any>[]): FormRecord => {
    const group: Record<string, AbstractControl> = {};
    searchFilters.forEach(searchFilter => {
      const formControl = searchFilter.toFormControl();
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;

      if (searchFilter.formatValue) {
        this.formatSubscriptions.add(
          formControl.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(value => {
              const formatted = searchFilter.formatValue?.(value);
              formControl.setValue(formatted, { emitEvent: false });
            })
        );
      }
    });
    return new FormRecord(group);
  };

  readonly asTextSearchFilter = (searchFilter: SearchFilterBase<any>): TextSearchFilter => searchFilter as TextSearchFilter;

  readonly asSelectSearchFilter = <T>(searchFilter: SearchFilterBase<T>): SelectSearchFilter<T> => searchFilter as SelectSearchFilter<T>;

  readonly asAutocompleteSearchFilter = <T>(searchFilter: SearchFilterBase<SelectOption<T>>): AutocompleteSearchFilter<T> =>
    searchFilter as AutocompleteSearchFilter<T>;

  readonly asDateTimeSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateTimeSearchFilter<T> => searchFilter as DateTimeSearchFilter<T>;

  readonly asDateSearchFilter = <T>(searchFilter: SearchFilterBase<T>): DateSearchFilter<T> => searchFilter as DateSearchFilter<T>;
}
