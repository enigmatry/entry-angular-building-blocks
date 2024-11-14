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
import { map } from 'rxjs/operators';
import { Country, Occupation, User } from './users';
import { of } from 'rxjs';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  @ViewChild(EntrySearchFilterComponent) entrySearchFilterComponent: EntrySearchFilterComponent;

  users: Array<User>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation', 'country'];
  filters = [];

  constructor(private _usersService: UsersService) {
    this.fetchUsers();
    this.filters = this.createSearchFilters();
  }

  searchFilterChange(searchParams: SearchFilterParams) {
    const errors: { [key: string]: string[] } = {};

    // Simulate a backend validation error for dateOfBirth
    if (searchParams.dateOfBirth && this.isInvalidDate(searchParams.dateOfBirth)) {
      errors.dateOfBirth = ["The date cannot be in the future."];
    }

    if (Object.keys(errors).length > 0) {
      this.setServerErrors(errors);
    } else {
      this.fetchUsers(searchParams);
    }
  }

  private isInvalidDate(date: string): boolean {
    const selectedDate = new Date(date);
    const maxDate = new Date();
    return selectedDate > maxDate;
  }

  setServerErrors(errors: { [key: string]: string[] }) {
    if (this.entrySearchFilterComponent) {
      this.entrySearchFilterComponent.setServerErrors(errors);
    }
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): void {
    this.users = this._usersService.getUsers(searchParams);
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
