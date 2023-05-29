import { Component } from '@angular/core';
import { SearchFilterInput, SearchFilterParams } from 'projects/entry-components/search-filter/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UsersService } from './users.service';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  users: Array<User>;
  filters = [new SearchFilterInput({
    key: 'name',
    label: 'Name',
    placeholder: 'User name or lastname',
    maxLength: 25
  }),
  new SearchFilterInput({
    key: 'email',
    label: 'E-mail',
    placeholder: 'user@example.com',
    type: 'email'
  })];

  // displayedColumns is property needed to configure Angular material table
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'createdOn', 'updatedOn'];

  constructor(protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected usersService: UsersService) {
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
