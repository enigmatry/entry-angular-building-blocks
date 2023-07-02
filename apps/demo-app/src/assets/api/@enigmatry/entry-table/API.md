[**@enigmatry/entry-table**](API.md) ( [Readme](README.md) \| API )

---

# @enigmatry/entry-table

## Index

### Classes

- [PageEvent](API.md#pageevent)

### Interfaces

- [SortEvent](API.md#sortevent)

## Classes

### PageEvent

Change event object that is emitted when the user selects a
different page size or navigates to another page.

#### Properties

| Property             | Type     | Description                                                                                                      |
| :------------------- | :------- | :--------------------------------------------------------------------------------------------------------------- |
| `length`             | `number` | The current total number of items being paged                                                                    |
| `pageIndex`          | `number` | The current page index.                                                                                          |
| `pageSize`           | `number` | The current page size                                                                                            |
| `previousPageIndex`? | `number` | Index of the page that was selected previously.<br />@breaking-change 8.0.0 To be made into a required property. |

## Interfaces

### SortEvent

The current sort state.

#### Properties

| Property    | Type            | Description                        |
| :---------- | :-------------- | :--------------------------------- |
| `active`    | `string`        | The id of the column being sorted. |
| `direction` | `SortDirection` | The sort direction.                |
