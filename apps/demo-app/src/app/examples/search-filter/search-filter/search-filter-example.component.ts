import { Component } from '@angular/core';
import { UsersService } from './users.service';
import {
  AutocompleteSearchFilter,
  SearchFilterBase,
  SearchFilterParams,
  SelectOption,
  SelectSearchFilter,
  TextSearchFilter,
} from '@enigmatry/entry-components/search-filter';
import { map } from 'rxjs/operators';
import { Occupation, User } from './users';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  users: Array<User>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation'];
  filters = [];

  constructor(private _usersService: UsersService) {
    this.fetchUsers();
    this.filters = this.createSearchFilters();
  }

  searchFilterChange(searchParams: SearchFilterParams) {
    this.fetchUsers(searchParams);
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): void {
    this.users = this._usersService.getUsers(searchParams);
  }

  private createSearchFilters(): SearchFilterBase<any>[] {
    return [
      new TextSearchFilter({
        key: 'name',
        label: 'Name',
        placeholder: 'User name or last name',
        maxLength: 25
      }),
      new TextSearchFilter({
        key: 'email',
        label: 'E-mail',
        placeholder: 'user@example.com',
        type: 'email'
      }),
      new SelectSearchFilter({
        key: 'occupation',
        label: 'Occupation',
        placeholder: 'Select occupation',
        multiSelect: true,
        options: Object.values(Occupation)
          .filter(value => typeof(value) === 'number')
          .map((value: number) => new SelectOption(
            value, Occupation[value].replace(/^[a-z]/, x => x.toUpperCase())))
      }),
      new AutocompleteSearchFilter({
        key: 'username',
        label: 'Username',
        placeholder: 'Select username',
        searchFunction: (input: string) => this._usersService
          .getUsernames()
          .pipe(map(usernames => usernames.filter(un => un.includes(input)).map(un => new SelectOption(un, un))))
      })
      // new SelectSearchFilter({
      //   key: 'username',
      //   label: 'Username',
      //   placeholder: 'Select username',
      //   multiSelect: false,
      //   options$: this._usersService
      //     .getUsernames()
      //     .pipe(map(usernames => usernames.map(un => new SelectOption(un, un))))
      // })
    ];
  }
}
