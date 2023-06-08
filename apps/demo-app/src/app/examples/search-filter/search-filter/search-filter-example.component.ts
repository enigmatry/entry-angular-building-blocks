import { Component } from '@angular/core';
import { User, UsersService } from './users.service';
import { SearchFilterTextInput, SearchFilterParams } from '@enigmatry/entry-components/search-filter';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  users: Array<User>;
  filters = [
    new SearchFilterTextInput({
      key: 'name',
      label: 'Name',
      placeholder: 'User name or last name',
      maxLength: 25
    }),
    new SearchFilterTextInput({
      key: 'email',
      label: 'E-mail',
      placeholder: 'user@example.com',
      type: 'email'
    })
  ];

  // displayedColumns is property needed to configure Angular material table
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'occupation'];

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
