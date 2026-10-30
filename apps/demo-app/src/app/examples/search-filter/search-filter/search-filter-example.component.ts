import { Component, ErrorHandler, LOCALE_ID, inject, linkedSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSnackBar } from '@angular/material/snack-bar';
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
import { catchError, firstValueFrom, map, of } from 'rxjs';
import { countryContinent, maskDecimalScore } from './search-filter-example.functions';
import { Country, Occupation, User } from './users';
import { UsersService } from './users.service';

const isValidationProblem = (error: unknown): error is IValidationProblemDetails =>
  typeof error === 'object' && error !== null && 'errors' in error;

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
  private readonly usersService: UsersService = inject(UsersService);
  private readonly locale: string = inject(LOCALE_ID);
  private readonly errorHandler = inject(ErrorHandler);
  private readonly snackBar = inject(MatSnackBar);

  // Declared above the field that calls it: an arrow property below would still be undefined.
  private readonly reportFailure = (error: unknown): void => {
    this.errorHandler.handleError(error);
    this.snackBar.open('The search failed. Try again.');
  };

  // Handled before the conversion: a `toSignal` signal rethrows the stream's error when it is read,
  // and the read happens while the table renders, which would take change detection down with it.
  private readonly allUsers = toSignal(
    this.usersService.getUsers({}).pipe(catchError((error: unknown) => {
      this.reportFailure(error);
      return of([] as User[]);
    })),
    { initialValue: [] }
  );
  protected readonly users = linkedSignal(() => this.allUsers());
  protected readonly displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation', 'country', 'score'];
  protected readonly filters: SearchFilterBase<unknown>[];

  /** An HTTP-backed option list reaches the filter as a signal rather than an observable. */
  private readonly usernameOptions = toSignal(
    this.usersService.getUsernames().pipe(map(usernames => usernames.map(username => new SelectOption(username, username)))),
    { initialValue: [] }
  );

  constructor() {
    this.filters = this.createSearchFilters();
  }

  /**
   * Runs the search and hands back whatever the server rejected. Angular puts each message on its
   * filter and clears it when that filter is edited, so nothing here touches a form control.
   */
  protected readonly search = async(searchParams: SearchFilterParams): Promise<readonly SearchFilterServerError[] | void> => {
    try {
      this.users.set(await firstValueFrom(this.usersService.getUsers(searchParams)));
      return undefined;
    } catch(error) {
      if (isValidationProblem(error)) {
        return toServerErrors(error);
      }
      this.reportFailure(error);
      return undefined;
    }
  };

  // eslint-disable-next-line max-lines-per-function
  private readonly createSearchFilters = (): SearchFilterBase<unknown>[] => [
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
        .map(country => new SelectOption(country, country, countryContinent(country)))),
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
      formatValue: value => maskDecimalScore(value, this.locale)
    })
  ];
}

