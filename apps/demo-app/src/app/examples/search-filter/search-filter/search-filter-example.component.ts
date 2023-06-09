import { Component } from '@angular/core';
import { Occupation, User, UsersService } from './users.service';
import {
  SearchFilterParams,
  SearchFilterSelectOption,
  SelectSearchFilter,
  TextSearchFilter
} from '@enigmatry/entry-components/search-filter';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  users: Array<User>;
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation'];
  filters = [
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
      placeholder: 'Pilot',
      multiSelect: false,
      options: Object.values(Occupation)
        .filter(value => typeof(value) === 'number')
        .map((value: number) =>new SearchFilterSelectOption(value, Occupation[value]))
    })
  ];

  constructor(private usersService: UsersService) {
    this.fetchUsers();
  }

  // Handle search filters change
  searchFilterChange(searchParams: SearchFilterParams) {
    this.fetchUsers(searchParams);
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): void {
    this.users = this.usersService.getUsers(searchParams);
  }
}
