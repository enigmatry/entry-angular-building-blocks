import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output, signal, Signal, untracked } from '@angular/core';
import { AbstractControl, FormRecord } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AutocompleteSearchFilter } from './autocomplete/autocomplete-search-filter.model';
import { BuiltSearchFilters } from './built-search-filters.model';
import { ControlType } from './control-type';
import { DateSearchFilter } from './date/date-search-filter.model';
import { DateTimeSearchFilter } from './date-time/date-time-search-filter.model';
import { SearchFilterBase } from './search-filter-base.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import { SearchFilterParams } from './search-filter-params.type';
import { SelectSearchFilter } from './select/select-search-filter.model';
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
  readonly searchFilters = input<SearchFilterBase<unknown>[]>([]);
  /**
   * Emits the change in SearchFilterParams so the containing component can apply them and retrieve the filtered results.
   */
  readonly searchFilterChange = output<SearchFilterParams>();

  readonly controlType = ControlType;
  readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);

  private readonly built = signal<BuiltSearchFilters>({ filters: [], form: new FormRecord({}) });

  /** Replaced on every rebuild, so controls that are gone do not keep formatting subscriptions alive. */
  private formatSubscriptions = new Subscription();

  /** The filters the form was built from - the template iterates these, so the two cannot disagree. */
  readonly renderedSearchFilters: Signal<SearchFilterBase<unknown>[]> = computed(() => this.built().filters);

  /** A `FormRecord` rather than a `FormGroup`: the keys come from the bound filters, not from compile time. */
  readonly searchFilterForm: Signal<FormRecord> = computed(() => this.built().form);

  constructor() {
    // An effect rather than a computed: building mints controls and opens subscriptions, which a computed body may not do.
    effect(onCleanup => {
      const filters = this.searchFilters();
      const currentValues = untracked(() => this.built().form.value);
      const formatSubscriptions = new Subscription();
      this.formatSubscriptions = formatSubscriptions;

      // Values carry over by key so a rebind does not discard what the user typed.
      this.built.set({ filters, form: this.toFormGroup(filters, currentValues) });

      onCleanup(() => formatSubscriptions.unsubscribe());
    });
  }

  readonly onSubmit = (): void => {
    this.searchFilterChange.emit(this.searchFilterForm().value);
  };

  readonly toFormGroup = (
    searchFilters: SearchFilterBase<unknown>[],
    currentValues: Record<string, unknown> = {}
  ): FormRecord => {
    const group: Record<string, AbstractControl> = {};
    searchFilters.forEach(searchFilter => {
      const formControl = searchFilter.toFormControl();
      // Own keys only - `in` matches `constructor` and would seed the control with a function.
      if (Object.hasOwn(currentValues, searchFilter.key)) {
        formControl.setValue(currentValues[searchFilter.key], { emitEvent: false });
      }
      group[searchFilter.key] = formControl;
      searchFilter.formControl = formControl;

      if (searchFilter.formatValue) {
        this.formatSubscriptions.add(
          formControl.valueChanges.subscribe(value => {
            const formatted = searchFilter.formatValue?.(value);
            formControl.setValue(formatted, { emitEvent: false });
          })
        );
      }
    });
    return new FormRecord(group);
  };

  readonly asTextSearchFilter = (searchFilter: SearchFilterBase<unknown>): TextSearchFilter => searchFilter as TextSearchFilter;

  readonly asSelectSearchFilter = (searchFilter: SearchFilterBase<unknown>): SelectSearchFilter<unknown> =>
    searchFilter as SelectSearchFilter<unknown>;

  readonly asAutocompleteSearchFilter = (searchFilter: SearchFilterBase<unknown>): AutocompleteSearchFilter<unknown> =>
    searchFilter as unknown as AutocompleteSearchFilter<unknown>;

  readonly asDateTimeSearchFilter = (searchFilter: SearchFilterBase<unknown>): DateTimeSearchFilter<unknown> =>
    searchFilter as DateTimeSearchFilter<unknown>;

  readonly asDateSearchFilter = (searchFilter: SearchFilterBase<unknown>): DateSearchFilter<unknown> =>
    searchFilter as DateSearchFilter<unknown>;
}
