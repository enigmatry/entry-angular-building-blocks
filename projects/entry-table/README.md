# Entry table

Reusable table component for Angular.

## Installation

```
npm install @enigmatry/entry-table
```

## Basic Usage

Import the `EntryTableModule` in your `feature.module` or `shared.module`.

```typescript
import { EntryTableModule } from '@enigmatry/entry-table';
```

`component.ts`

```typescript
import { PagedData, ContextMenuItem, ColumnDef } from '@enigmatry/entry-table';

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
    (pageChange)="pageChange.emit($event)"
    (sortChange)="sortChange.emit($event)"
    (rowSelectionChange)="selectionChange.emit($event)"
    (contextMenuItemSelected)="contextMenuItemSelected.emit($event)">
</entry-table>
```

## Compatibility with Angular Versions

| @enigmatry/entry-table | Angular version
|-|-|
|1.x| >= 13

## License

Apache-2 © Enigmatry