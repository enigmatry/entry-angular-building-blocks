import { Component, signal } from '@angular/core';
import {
  AutocompleteSearchFilter,
  SearchFilterBase,
  SearchFilterParams,
  SearchFilterServerError,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter
} from '@enigmatry/entry-components/search-filter';

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
  new AutocompleteSearchFilter<string>({
    key: 'owner',
    label: 'Owner',
    search: input => Promise.resolve(['Ada', 'Alan', 'Grace', 'Edsger']
      .filter(name => name.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
      .map(name => new SelectOption(name, name)))
  })
];

/**
 * Exercises the behaviour no other example reaches: a filter set that changes after first render.
 * Nothing in a real application does this today, so without this page the migration would ship
 * having verified only the fixed-array case.
 */
@Component({
  selector: 'app-dynamic-search-filter-example',
  templateUrl: './dynamic-search-filter-example.component.html',
  standalone: false
})
export class DynamicSearchFilterExampleComponent {
  /** Held in a signal, so add and remove are ordinary writes rather than a rebind. */
  readonly filters = signal<SearchFilterBase<unknown>[]>(baseFilters());

  readonly lastParams = signal<SearchFilterParams | undefined>(undefined);
  readonly navigatedParams = signal<SearchFilterParams | undefined>(undefined);
  readonly rejectRegion = signal(true);

  private extraCount = 0;

  /** Rejects `region` on demand, so a stale server error can be watched across searches. */
  readonly search = (searchParams: SearchFilterParams): Promise<readonly SearchFilterServerError[] | void> => {
    this.lastParams.set(searchParams);
    const regionRejected = this.rejectRegion() && Boolean(searchParams['region']);
    return Promise.resolve(regionRejected
      ? [{ key: 'region', message: 'The server does not like this region.' }]
      : undefined);
  };

  /** Proof that the output still fires for a caller that would navigate instead of fetching. */
  readonly onSearchFilterChange = (searchParams: SearchFilterParams): void => {
    this.navigatedParams.set(searchParams);
  };

  readonly addFilter = (): void => {
    this.extraCount += 1;
    const key = `extra${this.extraCount}`;
    this.filters.update(current => [...current, new TextSearchFilter({ key, label: `Extra ${this.extraCount}` })]);
  };

  readonly removeLastFilter = (): void => {
    this.filters.update(current => current.length > baseFilters().length ? current.slice(0, dropLastItem) : current);
  };

  /** Hands over fresh filters carrying values, which is how a caller restores from a URL now. */
  readonly restoreFromParams = (): void => {
    this.filters.update(current => current.map(searchFilter => searchFilter.key === 'term'
      ? new TextSearchFilter({ key: 'term', label: 'Term', value: 'restored' })
      : searchFilter));
  };
}

