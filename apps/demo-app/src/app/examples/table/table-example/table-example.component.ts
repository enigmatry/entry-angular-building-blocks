import { Component, inject, OnInit } from '@angular/core';
import { ColumnDefinition, ContextMenuItem } from '@enigmatry/entry-components/table';
import { User } from '../../search-filter/search-filter/users';
import { UsersService } from '../../search-filter/search-filter/users.service';

@Component({
    selector: 'app-table-example',
    templateUrl: './table-example.component.html',
    styleUrls: ['./table-example.component.scss'],
    standalone: false
})
export class TableExampleComponent implements OnInit {
  users: User[];

  columns: ColumnDefinition[] = [];
  contextMenuItems: ContextMenuItem[] = [];
  private readonly usersService: UsersService = inject(UsersService);

  constructor() {
    this.usersService.getUsers({}).subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: err => {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch users', err);
      }
    });
  }

  ngOnInit(): void {
    this.columns = [
      { field: 'id', hide: true },
      { field: 'userName', header: 'E-mail', sortable: true },
      { field: 'firstName', header: 'First name', hide: false, sortable: true },
      { field: 'lastName', header: 'Last name', hide: false, sortable: true },
      { field: 'dateOfBirth', header: 'Date of birth', hide: false, sortable: true, type: 'date', typeParameter: { format: 'dd-MM-yyyy' } },
      { field: 'occupation', header: 'Occupation', hide: false, sortable: true },
      { field: 'lastLogin', header: 'Last login', hide: false, sortable: true, type: 'date' }
    ];

    this.contextMenuItems = [{
      id: 'edit',
      name: 'Edit'
    },
    {
      id: 'delete',
      name: 'Delete'
    },
    {
      id: 'export',
      name: `Export`,
      items: [
        {
          id: 'export_csv',
          name: 'CSV'
        },
        {
          id: 'export_json',
          name: 'JSON'
        }
      ]
    }];
  }
}
