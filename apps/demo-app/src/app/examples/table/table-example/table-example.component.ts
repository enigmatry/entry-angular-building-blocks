import { Component, OnInit } from '@angular/core';
import { ColumnDef, ContextMenuItem } from '@enigmatry/entry-components/table';
import { User } from '../../search-filter/search-filter/users';
import { UsersService } from '../../search-filter/search-filter/users.service';

@Component({
  selector: 'app-table-example',
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
})
export class TableExampleComponent implements OnInit {
  users: User[];

  columns: ColumnDef[] = [];
  contextMenuItems: ContextMenuItem[] = [];

  constructor(usersService: UsersService) {
    this.users = usersService.getUsers({});
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
    this.contextMenuItems = [
      {
        id: 'edit', name: `Edit`, icon: 'edit'
      },
      {
        id: 'subMenu', name: 'Sub menu', icon: 'menu', items:
          [{
            id: 'add',
            name: 'Add',
            icon: 'add'
          },
          {
            id: 'delete',
            name: 'Delete',
            icon: 'delete'
          }]
      }
    ];
  }
}
