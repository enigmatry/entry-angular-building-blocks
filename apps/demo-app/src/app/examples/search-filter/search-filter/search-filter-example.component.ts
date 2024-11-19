import { Component, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import {
  AutocompleteSearchFilter,
  DateTimeSearchFilter,
  EntrySearchFilterComponent,
  SearchFilterBase,
  SearchFilterParams,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter,
} from '@enigmatry/entry-components/search-filter';
import { map, tap } from 'rxjs/operators';
import { Country, Occupation, User } from './users';
import { Observable, of } from 'rxjs';
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  @ViewChild(EntrySearchFilterComponent, { static: true }) entrySearchFilterComponent: EntrySearchFilterComponent;

  users: Array<User>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation', 'country'];
  filters = [];

  constructor(private _usersService: UsersService) {
    this.fetchUsers({}).subscribe();
    this.filters = this.createSearchFilters();
  }

  searchFilterChange(searchParams: SearchFilterParams): void {
    this.fetchUsers(searchParams).subscribe();
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): Observable<User[]> {
    return this._usersService.getUsers(searchParams).pipe(
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
          .filter(value => typeof (value) === 'number')
          .map((value: number) => new SelectOption(
            value, Occupation[value].replace(/^[a-z]/, x => x.toUpperCase())))
      }),
      new SelectSearchFilter({
        key: 'username',
        label: 'Username',
        placeholder: 'Select username',
        multiSelect: false,
        options$: this._usersService
          .getUsernames()
          .pipe(map(usernames => usernames.map(un => new SelectOption(un, un))))
      }),
      new AutocompleteSearchFilter({
        key: 'country',
        label: 'Country',
        placeholder: 'Select country',
        minimumCharacters: 0,
        search: (input: string) => of(Object.values(Country)
          .filter(value => value.toLocaleLowerCase().includes(input.toLocaleLowerCase()))
          .map((country => new SelectOption(country, country))))
      }),
      new DateTimeSearchFilter({
        key: 'dateOfBirth',
        label: 'Born after',
        placeholder: 'Born after'
      })
    ];
  }
}
