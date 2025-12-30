# Entry table

Reusable table component with context menu, sorting and paging.

## Installation

```batch
npm install @enigmatry/entry-components
```

## Basic Usage

Import the `EntryTableModule` in your `feature.module`, `shared.module` or your standalone component

```typescript
import { EntryTableModule } from '@enigmatry/entry-components/table';
```

`component.ts`

```typescript
import { EntryTableComponent } from '@enigmatry/entry-components/table';
import { ContextMenuItem, ColumnDefinition } from '@enigmatry/entry-components/table/interfaces';
import { Component, computed, inject, resource } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from '../../search-filter/search-filter/users';
import { UsersService } from '../../search-filter/search-filter/users.service';

@Component({
  selector: 'app-table-example',
  imports: [EntryTableComponent],
  templateUrl: './table-example.component.html',
  styleUrls: ['./table-example.component.scss']
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
  protected readonly contextMenuItems: ContextMenuItem[] = [{ id: 'edit', name: 'Edit' }];

  private readonly usersService: UsersService = inject(UsersService);
  readonly usersResource = resource({
    loader: async() => {
      return lastValueFrom(this.usersService.getUsers({}));
    }
  });
  protected readonly users = computed<User[]>(() => this.usersResource.hasValue() ? this.usersResource.value() : []);
}
```

`component.html`

```html
<entry-table
    [columns]="columns"
    [data]="users()"
    [showPaginator]="true"
    [showContextMenu]="true"
    [rowSelectable]="true"
    [multiSelectable]="true"
    [contextMenuItems]="contextMenuItems">
</entry-table>
```

## Configuration

Default values are:

* showPaginator: true
* showFirstLastButtons: false
* pageSize: 20
* pageSizeOptions: [20, 50, 100]
* hidePageSize: false
* noResultsText: 'No results found'
* rowFocusVisible: false

To override with custom defaults use `provideEntryTableConfiguration` function:

```ts
import { EntryTableModule, provideEntryTableConfiguration } from '@enigmatry/entry-components/table';
import { CommonModule, DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { NgModule } from '@angular/core';
import { TableExampleComponent } from './table-example/table-example.component';

@NgModule({
  imports: [
    CommonModule,
    EntryTableModule,
    TableExampleComponent
  ],
  exports: [
    TableExampleComponent
  ],
  providers: [
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd-MM-yyyy HH:mm' } },
    provideEntryTableConfiguration({
      showPaginator: true,
      pageSizeOptions: [10, 25, 50],
      rowFocusVisible: true
    })
  ]
})
export class TableExampleModule { }
```

## Compatibility with Angular Versions

| @enigmatry/entry-components | Angular version |
| --------------------------- | --------------- |
| 1.14.x                      | = 14            |
| 15.x                        | = 15            |
| 16.x                        | = 16            |
| 17.x                        | = 17            |
| 18.x                        | = 18            |
| 19.x                        | = 19            |
| 20.x                        | = 20            |
| 21.x                        | = 21            |

## License

Apache-2 © Enigmatry