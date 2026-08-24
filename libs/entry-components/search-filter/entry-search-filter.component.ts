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

  /**
   * The filters the form was actually built from. The template iterates this rather than the input
   * so the rendered controls and the form can never disagree.
   */
  readonly renderedSearchFilters: Signal<SearchFilterBase<unknown>[]> = computed(() => this.built().filters);

  /**
   * Form group holding one control per search filter. A `FormRecord` rather than a `FormGroup`,
   * because the keys come from the bound filters and are not known at compile time.
   */
  readonly searchFilterForm: Signal<FormRecord> = computed(() => this.built().form);

  constructor() {
    // An effect rather than a computed: building mints controls, assigns each one onto its filter
    // model and opens formatting subscriptions, none of which a computed body may do. Every new
    // input array rebuilds, so a filter set replaced once its options load is rendered and bound.
    effect(onCleanup => {
      const filters = this.searchFilters();
      const currentValues = untracked(() => this.built().form.value);
      const formatSubscriptions = new Subscription();
      this.formatSubscriptions = formatSubscriptions;

      // Values are carried over by key so a rebind does not discard what the user typed - callers
      // do bind `[searchFilters]="getFilters()"`, which hands over a fresh array on every check.
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
      if (searchFilter.key in currentValues) {
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
