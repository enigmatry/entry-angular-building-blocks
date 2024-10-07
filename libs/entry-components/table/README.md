# Entry table

Reusable table component with context menu, sorting and paging.

## Installation

```
npm install @enigmatry/entry-components
```

## Basic Usage

Import the `EntryTableModule` in your `feature.module` or `shared.module`

```typescript
import { EntryTableModule } from '@enigmatry/entry-components/table';
```

`component.ts`

```typescript
import { PagedData, ContextMenuItem, ColumnDef } from '@enigmatry/entry-components/table';

@Component({
...
})
export class UserListComponent implements OnInit {

  @Input() data: PagedData<GetUsersResponseItem> | null;

  @Input() columns: ColumnDef[] = [];
  @Input() contextMenuItems: ContextMenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.columns = [
      { field: 'id', hide: true, sortable: true },
      { field: 'userName', header: `E-mail`, hide: false, sortable: true },
      { field: 'name', header: `Name`, hide: false, sortable: true },
      { field: 'createdOn', header: `Created on`, hide: false, sortable: true, type: 'date' },
      { field: 'updatedOn', header: `Updated on`, hide: false, sortable: true, type: 'date' }
    ];
    this.contextMenuItems = [
      { id: 'edit', name: `Edit`, icon: 'edit' }
    ];
  }
}
```

`component.html`

```html
<entry-table
    [columns]="columns"
    [data]="data"
    [showPaginator]="true"
    [showContextMenu]="true"
    [contextMenuItems]="contextMenuItems"
    (pageChange)="pageChange.emit($event)"
    (sortChange)="sortChange.emit($event)"
    (rowSelectionChange)="selectionChange.emit($event)"
    (contextMenuItemSelected)="contextMenuItemSelected.emit($event)">
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

To override with custom defaults use `provideEntryTableConfig` function:

```ts
import { EntryTableModule, provideEntryTableConfig } from '@enigmatry/entry-components/table';

@NgModule({
  imports: [
    EntryTableModule
  ],
  providers: [
      provideEntryTableConfig({
      showPaginator: true,
      pageSizeOptions: [10, 25, 50],
      rowFocusVisible: true
    })
  ]
})
export class EntryComponentsModule { }
```


## Compatibility with Angular Versions

| @enigmatry/entry-components | Angular version |
| --------------------------- | --------------- |
| 1.14.x                      | = 14            |
| 15.x                      | = 15            |
| 16.x                      | = 16            |
| 17.x                      | = 17            |

## License

Apache-2 © Enigmatry