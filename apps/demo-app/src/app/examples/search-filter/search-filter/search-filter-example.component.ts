import { Component } from '@angular/core';
import { Occupation, User, UsersService } from './users.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  SearchFilterParams,
  SelectSearchFilter,
  SelectSearchFilterOption,
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
      multiSelect: true,
      options: Object.values(Occupation)
        .filter(value => typeof(value) === 'number')
        .map((value: number) =>new SelectSearchFilterOption(value, Occupation[value]))
    })
  ];

  constructor(private usersService: UsersService) {
    this.fetchUsers();
  }

  searchFilterChange(searchParams: SearchFilterParams) {
    this.fetchUsers(searchParams);
  }

  enableMultipleSelectChanged(event: MatCheckboxChange) {
  }

  private fetchUsers(searchParams: SearchFilterParams = {}): void {
    this.users = this.usersService.getUsers(searchParams);
  }
}
