import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { Field, FieldTree, ValidationError, form } from '@angular/forms/signals';
import { AutocompleteSearchFilter } from './autocomplete/autocomplete-search-filter.model';
import { ControlType } from './control-type';
import { DateSearchFilter } from './date/date-search-filter.model';
import { DateTimeSearchFilter } from './date-time/date-time-search-filter.model';
import { SearchFilterAction, SearchFilterServerError } from './search-filter-action.type';
import { SearchFilterBase } from './search-filter-base.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import { emptySearchFilterValue, searchFilterEntry, searchFilterSchema } from './search-filter-model.functions';
import { SearchFilterParams } from './search-filter-params.type';
import { SearchFilterValues } from './search-filter-values.type';
import { SelectSearchFilter } from './select/select-search-filter.model';
import { TextSearchFilter } from './text/text-search-filter.model';

const toSubmissionError = (
  field: FieldTree<SearchFilterValues>,
  error: SearchFilterServerError
): ValidationError.WithOptionalFieldTree => error.key === undefined
  ? { kind: 'serverError', message: error.message }
  : { kind: 'serverError', message: error.message, fieldTree: (field as Record<string, unknown>)[error.key] as FieldTree<unknown> };

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
  protected readonly config: EntrySearchFilterConfig = inject(ENTRY_SEARCH_FILTER_CONFIG);

  /** Configuration of the search filters inputs that will be displayed in the search-filter component. */
  readonly searchFilters = input<SearchFilterBase<unknown>[]>([]);

  /** Runs the search. Return the server's messages to place them on their filters. */
  readonly searchAction = input.required<SearchFilterAction>();

  /** Emitted on every accepted search, for a caller that navigates rather than fetching here. */
  readonly searchFilterChange = output<SearchFilterParams>();

  protected readonly controlType = ControlType;

  /**
   * Carries a value across a rebind only while the filter still declares the same one, so handing
   * over filters with new values - the way to set them, now that the models hold no control - wins
   * over what the user typed, and a rebind that changes nothing does not.
   */
  private readonly model = linkedSignal<readonly SearchFilterBase<unknown>[], SearchFilterValues>({
    source: () => this.searchFilters(),
    computation: (searchFilters, previous) => Object.fromEntries(searchFilters.map(searchFilter => {
      const declared = previous?.source.find(earlier => earlier.key === searchFilter.key);
      const keepTyped = declared !== undefined && declared.value === searchFilter.value
        && previous !== undefined && Object.hasOwn(previous.value, searchFilter.key);
      return keepTyped ? [searchFilter.key, previous.value[searchFilter.key]] : searchFilterEntry(searchFilter);
    }))
  });

  // Declared above `filterForm` because a field initializer reads them: an arrow property below it
  // would still be `undefined` when `form()` captures it.
  private readonly runSearch = async(
    field: FieldTree<SearchFilterValues>
  ): Promise<readonly ValidationError.WithOptionalFieldTree[]> => {
    const values = this.model();
    this.searchFilterChange.emit(values);
    const errors = await this.searchAction()(values) ?? [];
    return errors.map(error => toSubmissionError(field, error));
  };

  private readonly focusFirstInvalidFilter = (): void => {
    const summary = this.filterForm().errorSummary();
    const firstError = summary.at(0);
    if (firstError) {
      firstError.fieldTree().focusBoundControl();
    }
  };

  protected readonly filterForm = form(this.model, searchFilterSchema(() => this.searchFilters(), this.config), {
    submission: { action: this.runSearch, onInvalid: this.focusFirstInvalidFilter }
  });

  /** Read off the input rather than by iterating the field tree, which does not track its key set. */
  protected readonly renderedSearchFilters = computed(() => this.searchFilters());

  /**
   * Empties every filter and forgets which were touched, in one write.
   *
   * @remarks Built from the filters bound right now, never from a snapshot: `reset` replaces the
   * model wholesale, so a key missing from the value passed would drop out of the form.
   */
  protected readonly clear = (): void => {
    this.filterForm().reset(Object.fromEntries(
      this.searchFilters().map(searchFilter => [searchFilter.key, emptySearchFilterValue(searchFilter)])
    ));
  };

  protected readonly asTextSearchFilter = (searchFilter: SearchFilterBase<unknown>): TextSearchFilter =>
    searchFilter as TextSearchFilter;

  protected readonly asSelectSearchFilter = (searchFilter: SearchFilterBase<unknown>): SelectSearchFilter<unknown> =>
    searchFilter as SelectSearchFilter<unknown>;

  protected readonly asAutocompleteSearchFilter = (searchFilter: SearchFilterBase<unknown>): AutocompleteSearchFilter<unknown> =>
    searchFilter as AutocompleteSearchFilter<unknown>;

  protected readonly asDateSearchFilter = (searchFilter: SearchFilterBase<unknown>): DateSearchFilter<Date> =>
    searchFilter as DateSearchFilter<Date>;

  protected readonly asDateTimeSearchFilter = (searchFilter: SearchFilterBase<unknown>): DateTimeSearchFilter<Date> =>
    searchFilter as DateTimeSearchFilter<Date>;

  // The tree resolves any key, so a filter keyed `name` or `length` would type as that Function
  // member instead of a field. Every field reaches the template through one of these instead.
  protected readonly asTextField = (key: string): Field<string> => this.fieldAt(key);
  protected readonly asSelectField = (key: string): Field<unknown> => this.fieldAt(key);
  protected readonly asAutocompleteField = (key: string): Field<unknown> => this.fieldAt(key);
  protected readonly asDateField = (key: string): Field<Date | null> => this.fieldAt(key);

  private readonly fieldAt = <T>(key: string): Field<T> =>
    (this.filterForm as Record<string, unknown>)[key] as Field<T>;
}
