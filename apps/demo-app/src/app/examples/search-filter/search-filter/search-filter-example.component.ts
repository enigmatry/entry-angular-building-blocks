import { Component, inject, LOCALE_ID, ViewChild } from '@angular/core';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components';
import {
  AutocompleteSearchFilter,
  DateTimeSearchFilter,
  EntrySearchFilterComponent,
  SearchFilterBase,
  SearchFilterParams,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter
} from '@enigmatry/entry-components/search-filter';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Country, Occupation, User } from './users';
import { UsersService } from './users.service';

@Component({
    selector: 'app-search-filter-example',
    templateUrl: './search-filter-example.component.html',
    styleUrls: ['./search-filter-example.component.scss'],
    standalone: false
})
export class SearchFilterExampleComponent {
  @ViewChild(EntrySearchFilterComponent, { static: true }) entrySearchFilterComponent: EntrySearchFilterComponent;

  users: Array<User>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation', 'country', 'score'];
  filters: SearchFilterBase<any>[] = [];
  private readonly usersService: UsersService = inject(UsersService);
  private readonly locale: string = inject(LOCALE_ID);

  constructor() {
    this.fetchUsers({}).subscribe();
    this.filters = this.createSearchFilters();
  }

  searchFilterChange(searchParams: SearchFilterParams): void {
    this.fetchUsers(searchParams).subscribe();
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): Observable<User[]> {
    return this.usersService.getUsers(searchParams).pipe(
      tap({
        next: (users: User[]) => {
          this.users = users;
        },
        error: (error: IValidationProblemDetails) => {
          setServerSideValidationErrors(error, this.entrySearchFilterComponent.searchFilterForm);
        }
      })
    );
  }

  // eslint-disable-next-line max-lines-per-function
  private createSearchFilters(): SearchFilterBase<any>[] {
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
        multiSelect: false,
        options$: this.usersService
          .getUsernames()
          .pipe(map(usernames => usernames.map(un => new SelectOption(un, un))))
      }),
      new AutocompleteSearchFilter({
        key: 'country',
        label: 'Country',
        placeholder: 'Select country',
        minimumCharacters: 0,
        search: (input: string | null) => of(Object.values(Country)
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          .filter(value => value.toLocaleLowerCase().includes(input!.toLocaleLowerCase()))
          .map(country => new SelectOption(country, country)))
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

  private maskDecimalScore(value: string): string {
    const exampleDecimalValue = 1.1;
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const validSeparator = exampleDecimalValue.toLocaleString(this.locale).substring(1, 2);
    const wrongSeparator = validSeparator === ',' ? '.' : ',';
    return value
      .replace(wrongSeparator, validSeparator)
      .replace(/[^0-9.,]/gu, '')
      .replace(/,/gu, '.')
      .replace(/^0+/u, ''); // Remove leading zeros
  }
}
