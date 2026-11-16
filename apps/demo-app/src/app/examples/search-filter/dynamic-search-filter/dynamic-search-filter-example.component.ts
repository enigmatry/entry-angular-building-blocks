import { JsonPipe } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  AutocompleteSearchFilter,
  SearchFilterBase,
  SearchFilterParams,
  SearchFilterServerError,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter,
  EntrySearchFilterComponent,
  provideEntrySearchFilterConfig
} from '@enigmatry/entry-components/search-filter';

/** Stands in for an owners API. The key is an id the URL carries; the label is the name the user searches for. */
const owners: readonly SelectOption<string>[] = [
  new SelectOption('ada', 'Ada Lovelace'),
  new SelectOption('alan', 'Alan Turing'),
  new SelectOption('grace', 'Grace Hopper'),
  new SelectOption('edsger', 'Edsger Dijkstra')
];

/** The owner the server turns down, so its message can be watched landing on the autocomplete. */
const formerOwner = 'edsger';

const dropLastItem = -1;
const baseFilters = (): SearchFilterBase<unknown>[] => [
  new TextSearchFilter({ key: 'term', label: 'Term', maxLength: 10 }),
  new TextSearchFilter({ key: 'region', label: 'Region (server rejects this)' }),
  new TextSearchFilter({ key: 'reference', label: 'Reference (required)', required: true }),
  new SelectSearchFilter({
    key: 'status',
    label: 'Status',
    options: [new SelectOption('open', 'Open'), new SelectOption('closed', 'Closed')]
  }),
  new SelectSearchFilter<boolean>({
    key: 'archived',
    label: 'Archived (required)',
    required: true,
    options: [new SelectOption(true, 'Yes'), new SelectOption(false, 'No')]
  }),
  new AutocompleteSearchFilter<string>({
    key: 'owner',
    label: 'Owner (required)',
    placeholder: 'Search by name',
    required: true,
    search: input => Promise.resolve(owners.filter(owner => owner.label.toLocaleLowerCase().includes(input.toLocaleLowerCase()))),
    // A key restored from params has no option behind it yet; this turns it back into the name to show.
    resolveLabel: key => Promise.resolve(owners.find(owner => owner.key === key)?.label)
  })
];

/**
 * Exercises the behaviour no other example reaches: a filter set that changes after first render,
 * server messages placed on their filters, and a required autocomplete whose key is not its label.
 * Nothing in a real application changes its filter set today, so without this page the migration
 * would ship having verified only the fixed-array case.
 */
@Component({
  selector: 'app-dynamic-search-filter-example',
  templateUrl: './dynamic-search-filter-example.component.html',
  imports: [MatButton, EntrySearchFilterComponent, JsonPipe],
  providers: [provideEntrySearchFilterConfig({ applyButtonText: 'Filter' })]
})
export class DynamicSearchFilterExampleComponent {
  /** Held in a signal, so add and remove are ordinary writes rather than a rebind. */
  protected readonly filters = signal<SearchFilterBase<unknown>[]>(baseFilters());

  protected readonly lastParams = signal<SearchFilterParams | undefined>(undefined);
  protected readonly navigatedParams = signal<SearchFilterParams | undefined>(undefined);
  protected readonly rejectRegion = signal(true);

  private readonly searchFilter = viewChild.required(EntrySearchFilterComponent);

  private extraCount = 0;

  /** Rejects `region` on demand, so a stale server error can be watched across searches, and always rejects one owner. */
  protected readonly search = (searchParams: SearchFilterParams): Promise<readonly SearchFilterServerError[] | void> => {
    this.lastParams.set(searchParams);
    const errors: SearchFilterServerError[] = [];
    if (this.rejectRegion() && searchParams['region']) {
      errors.push({ key: 'region', message: 'The server does not like this region.' });
    }
    if (searchParams['owner'] === formerOwner) {
      errors.push({ key: 'owner', message: 'Edsger Dijkstra no longer owns any items.' });
    }
    return Promise.resolve(errors.length ? errors : undefined);
  };

  /** Proof that the output still fires for a caller that would navigate instead of fetching. */
  protected readonly onSearchFilterChange = (searchParams: SearchFilterParams): void => {
    this.navigatedParams.set(searchParams);
  };

  protected readonly addFilter = (): void => {
    this.extraCount += 1;
    const key = `extra${this.extraCount}`;
    this.filters.update(current => [...current, new TextSearchFilter({ key, label: `Extra ${this.extraCount}` })]);
  };

  protected readonly removeLastFilter = (): void => {
    this.filters.update(current => current.length > baseFilters().length ? current.slice(0, dropLastItem) : current);
  };

  /** Hands over fresh filters carrying values, which is how a caller restores from a URL now. */
  protected readonly restoreFromParams = (): void => {
    this.filters.update(current => current.map(searchFilter => searchFilter.key === 'term'
      ? new TextSearchFilter({ key: 'term', label: 'Term', value: 'restored' })
      : searchFilter));
  };

  /**
   * Applies params to filters already on screen, as when the user navigates back to `?owner=grace`. Every key the
   * params leave out returns to what its filter declares. Unlike handing the filters over again, this works on
   * every press, since it does not depend on a declared value changing.
   */
  protected readonly restoreOwnerFromParams = (): void => {
    this.searchFilter().reset({ owner: 'grace' });
  };
}
