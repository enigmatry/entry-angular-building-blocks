import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { Field, FieldTree, ValidationError, form, FormField, FormRoot } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { AutocompleteSearchFilterComponent } from './autocomplete/autocomplete-search-filter.component';
import { AutocompleteSearchFilter } from './autocomplete/autocomplete-search-filter.model';
import { ControlType } from './control-type';
import { DateSearchFilterComponent } from './date/date-search-filter.component';
import { DateSearchFilter } from './date/date-search-filter.model';
import { DateTimeSearchFilterComponent } from './date-time/date-time-search-filter.component';
import { DateTimeSearchFilter } from './date-time/date-time-search-filter.model';
import { SearchFilterAction } from './search-filter-action.type';
import { SearchFilterBase } from './search-filter-base.model';
import { ENTRY_SEARCH_FILTER_CONFIG, EntrySearchFilterConfig } from './search-filter-config.model';
import {
  carriedSearchFilterEntry,
  emptySearchFilterValue,
  restoredSearchFilterEntry,
  searchFilterRenderIdentity
} from './search-filter-entries.functions';
import { searchFilterSchema } from './search-filter-model.functions';
import { SearchFilterParams } from './search-filter-params.type';
import { changedKeys, isStale, toSubmissionError } from './search-filter-submission.functions';
import { SearchFilterValues } from './search-filter-values.type';
import { SelectSearchFilterComponent } from './select/select-search-filter.component';
import { SelectSearchFilter } from './select/select-search-filter.model';
import { TextSearchFilterComponent } from './text/text-search-filter.component';
import { TextSearchFilter } from './text/text-search-filter.model';

/**
 * Entry SearchFilter component.
 */
@Component({
    selector: 'entry-search-filter',
    templateUrl: './entry-search-filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormRoot, FormField, MatError, MatButton, EntryButtonDirective, TextSearchFilterComponent, SelectSearchFilterComponent,
      AutocompleteSearchFilterComponent, DateSearchFilterComponent, DateTimeSearchFilterComponent]
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

  /** Carries what the user typed across a rebind while each filter stays as it was declared - see `carriedSearchFilterEntry`. */
  private readonly model = linkedSignal<readonly SearchFilterBase<unknown>[], SearchFilterValues>({
    source: () => this.searchFilters(),
    computation: (searchFilters, previous) =>
      Object.fromEntries(searchFilters.map(searchFilter => carriedSearchFilterEntry(searchFilter, previous)))
  });

  // Declared above `filterForm` because a field initializer reads them: an arrow property below it
  // would still be `undefined` when `form()` captures it.
  private readonly runSearch = async(
    field: FieldTree<SearchFilterValues>
  ): Promise<readonly ValidationError.WithOptionalFieldTree[]> => {
    const values = this.model();
    // Copies, not the model: a consumer reshaping its params for the router would otherwise rewrite form state.
    this.searchFilterChange.emit({ ...values });
    const errors = await this.searchAction()({ ...values }) ?? [];
    const changed = changedKeys(values, this.model());
    return errors
      .filter(error => !isStale(error, changed))
      .map(error => toSubmissionError(field, error));
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

  protected readonly renderIdentity = searchFilterRenderIdentity;

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

  /**
   * Puts every filter back to the value given for its key, or else to the value it declares, and forgets which
   * were touched. A key given as `null` empties its filter; a key left out or given as `undefined` restores it.
   *
   * @remarks The way to restore a value the filter already declares. Handing the filters over again keeps what the
   * user typed when no declaration changed, so it cannot tell "put this back" from "nothing happened". Each value
   * must have the shape its filter holds - an array for a multi-select. A server message stays on a filter whose
   * value the reset leaves unchanged.
   */
  readonly reset = (values: SearchFilterParams = {}): void => {
    this.filterForm().reset(Object.fromEntries(
      this.searchFilters().map(searchFilter => restoredSearchFilterEntry(searchFilter, values))
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
