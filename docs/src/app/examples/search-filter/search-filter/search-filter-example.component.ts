import { Component } from '@angular/core';
import { GetUsersQuery } from './qet-users-query.model';
import { User } from './api-reference';
import { SearchFilterParams } from 'projects/entry-components/search-filter/public-api';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-search-filter-example',
  templateUrl: './search-filter-example.component.html',
  styleUrls: ['./search-filter-example.component.scss']
})
export class SearchFilterExampleComponent {
  users: Array<User>;
  query = new GetUsersQuery();
  // displayedColumns is property needed to configure Angular material table
  displayedColumns: string[] = ['name', 'email', 'dateOfBirth', 'createdOn', 'updatedOn'];

  constructor(protected router: Router,
    protected activatedRoute: ActivatedRoute,
    protected usersService: UsersService) {
    this.fetchUsers();
  }

  // Handle search filters change
  searchFilterChange(searchParams: SearchFilterParams) {
    this.query.searchFilterChange(searchParams);
    this.fetchUsers();
  }

  private fetchUsers(): void {
    this.users = this.usersService.getUsers(this.query);
  }
}
