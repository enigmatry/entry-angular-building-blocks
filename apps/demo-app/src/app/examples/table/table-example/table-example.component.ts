import { Component, computed, inject, resource } from '@angular/core';
import { ColumnDefinition, ContextMenuItem, EntryTableComponent } from '@enigmatry/entry-components/table';
import { lastValueFrom } from 'rxjs';
import { User } from '../../search-filter/search-filter/users';
import { UsersService } from '../../search-filter/search-filter/users.service';

@Component({
  selector: 'app-table-example',
  imports: [EntryTableComponent],
  templateUrl: './table-example.component.html',
  styleUrl: './table-example.component.scss'
})
export class TableExampleComponent {
  protected readonly columns: ColumnDefinition[] = [
    { field: 'id', hide: true },
    { field: 'userName', header: 'E-mail', sortable: true },
    { field: 'firstName', header: 'First name', hide: false, sortable: true },
    { field: 'lastName', header: 'Last name', hide: false, sortable: true },
    { field: 'dateOfBirth', header: 'Date of birth', hide: false, sortable: true, type: 'date', typeParameter: { format: 'dd-MM-yyyy' } },
    { field: 'occupation', header: 'Occupation', hide: false, sortable: true },
    { field: 'lastLogin', header: 'Last login', hide: false, sortable: true, type: 'date' }
  ];
  protected readonly contextMenuItems: ContextMenuItem[] = [
    { id: 'edit', name: 'Edit' },
    { id: 'delete', name: 'Delete' },
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

  private readonly usersService: UsersService = inject(UsersService);
  readonly usersResource = resource({
    loader: async() => {
      return lastValueFrom(this.usersService.getUsers({}));
    }
  });
  protected readonly users = computed<User[]>(() => this.usersResource.hasValue() ? this.usersResource.value() : []);
}
