import { Component, LOCALE_ID, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IValidationProblemDetails } from '@enigmatry/entry-components';
import {
  AutocompleteSearchFilter,
  DateTimeSearchFilter,
  SearchFilterBase,
  SearchFilterParams,
  SearchFilterServerError,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter
} from '@enigmatry/entry-components/search-filter';
import { firstValueFrom, map } from 'rxjs';
import { Country, Occupation, User } from './users';
import { UsersService } from './users.service';

const toServerErrors = (problem: IValidationProblemDetails): readonly SearchFilterServerError[] =>
  Object.entries(problem.errors ?? {})
    .flatMap(([key, messages]) => messages.map(message => ({ key, message })));

@Component({
    selector: 'app-search-filter-example',
    templateUrl: './search-filter-example.component.html',
    styleUrl: './search-filter-example.component.scss',
    standalone: false
})
export class SearchFilterExampleComponent {
  readonly users = signal<User[]>([]);
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation', 'country', 'score'];
  filters: SearchFilterBase<unknown>[] = [];

  private readonly usersService: UsersService = inject(UsersService);
  private readonly locale: string = inject(LOCALE_ID);

  /** An HTTP-backed option list reaches the filter as a signal rather than an observable. */
  private readonly usernameOptions = toSignal(
    this.usersService.getUsernames().pipe(map(usernames => usernames.map(username => new SelectOption(username, username)))),
    { initialValue: [] }
  );

  constructor() {
    this.filters = this.createSearchFilters();
    this.search({}).catch(() => undefined);
  }

  /**
   * Runs the search and hands back whatever the server rejected. Angular puts each message on its
   * filter and clears it when that filter is edited, so nothing here touches a form control.
   */
  readonly search = async(searchParams: SearchFilterParams): Promise<readonly SearchFilterServerError[] | void> => {
    try {
      this.users.set(await firstValueFrom(this.usersService.getUsers(searchParams)));
      return undefined;
    } catch(error) {
      return toServerErrors(error as IValidationProblemDetails);
    }
  };

  // eslint-disable-next-line max-lines-per-function
  private createSearchFilters(): SearchFilterBase<unknown>[] {
    return [
      new TextSearchFilter({
        key: 'name',
        label: 'Name',
        placeholder: 'User name or last name',
        maxLength: 25
      }),
      new SelectSearchFilter({
        key: 'occupation',
        label: 'Occupation',
        placeholder: 'Select occupation',
        multiSelect: true,
        options: Object.values(Occupation)
          .filter(value => typeof value === 'number')
          .map((value: number) => new SelectOption(value, Occupation[value].replace(/^[a-z]/u, x => x.toUpperCase())))
      }),
      new SelectSearchFilter({
        key: 'username',
        label: 'Username',
        placeholder: 'Select username',
        options: this.usernameOptions
      }),
      new AutocompleteSearchFilter<Country>({
        key: 'country',
        label: 'Country',
        placeholder: 'Select country',
        search: input => Promise.resolve(Object.values(Country)
          .filter(value => value.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
          .map(country => new SelectOption(country, country, this.countryContinent(country)))),
        resolveLabel: key => Promise.resolve(key as string)
      }),
      new DateTimeSearchFilter({
        key: 'dateOfBirth',
        label: 'Born after',
        placeholder: 'Born after'
      }),
      new TextSearchFilter({
        key: 'score',
        label: 'Score',
        placeholder: 'Decimal score',
        maxLength: 5,
        formatValue: this.maskDecimalScore
      })
    ];
  }

  private readonly countryContinents: Partial<Record<Country, string>> = {
    [Country.unitedStates]: 'Americas',
    [Country.canada]: 'Americas',
    [Country.mexico]: 'Americas',
    [Country.brazil]: 'Americas',
    [Country.argentina]: 'Americas',
    [Country.china]: 'Asia',
    [Country.india]: 'Asia',
    [Country.japan]: 'Asia',
    [Country.southKorea]: 'Asia',
    [Country.indonesia]: 'Asia',
    [Country.australia]: 'Oceania',
    [Country.southAfrica]: 'Africa'
  };

  private countryContinent = (country: Country): string => this.countryContinents[country] ?? 'Europe';

  private readonly maskDecimalScore = (value: unknown): string => {
    const exampleDecimalValue = 1.1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const validSeparator = exampleDecimalValue.toLocaleString(this.locale).substring(1, 2);
    const wrongSeparator = validSeparator === ',' ? '.' : ',';
    return String(value ?? '')
      .replace(wrongSeparator, validSeparator)
      .replace(/[^0-9.,]/gu, '')
      .replace(/,/gu, '.')
      .replace(/^0+/u, ''); // Remove leading zeros
  };
}

