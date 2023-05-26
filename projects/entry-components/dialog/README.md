# Entry Dialog

Enables working with built-in (alert and confirm) and custom dialogs. Supports dialog configuration on module level.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/entry-dialog';
import { MatDialogModule } from '@angular/material/dialog';
```

## Basic usage

`EntryDialogService` is used to open dialogs:

```ts
constructor (entryDialogService: EntryDialogService) {
    entryDialogService.openAlert({
        title: 'ALERT!', message: 'I want to tell you that I love you :)'
    })
}
```

## Configuration

`ENTRY_DIALOG_CONFIG`: `InjectionToken<EntryDialogConfig>` - Optional configuration used to override defaults.

```ts
// ...

@NgModule({
  imports: [
    EntryDialogModule,
    MatDialogModule
  ],
  providers: [
    {
        provide: ENTRY_DIALOG_CONFIG,
        useFactory: () => new EntryDialogConfig({
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          buttonsAlignment: 'align-center',
          hideClose: true,
          disableClose: true
        })
    }
  ]
})
export class AppModule { }
```

## EntryDialogService Methods

`openAlert(data: IEntryAlertDialogData): Observable<any>`

Opens alert dialog containing title and message defined in `data` parameter.

`openConfirm(data: IEntryConfirmDialogData): Observable<bool | undefined>`

Opens confirm dialog containing title and message defined in `data` parameter.

Returns `true` if confirmed, `false` if canceled or closed, and `undefined` if closed by clicking outside of dialog.

`open(component: Type<EntryDialogComponent>, data: unknown = undefined, cssClass: string = ''): Observable<any>`

Opens custom dialog component defined by `component` parameter. Optionally, it can receive input `data` or `cssClass`.

## Classes and Interfaces

| `IEntryAlertDialogData` |  |
| - | - |
| title: `string` | Dialog header title |
| message: `string` | Dialog content message |
| confirmText?: `string` | Optional confirm button text |

| `IEntryConfirmDialogData` |  |
| - | - |
| title: `string` | Dialog header title |
| message: `string` | Dialog content message |
| confirmText?: `string` | Optional confirm button text |
| cancelText?: `string` | Optional cancel button text |

| `EntryDialogConfig` |  |
| - | - |
| confirmButtonText: `string` | Confirm button text (default 'Ok') |
| cancelButtonText: `string` | Cancel button text (default 'Cancel') |
| buttonsAlignment: `string` | Buttons alignment values: `'align-right'`, `'align-center'` or `''` (default `'align-right'`) |

| `EntryDialogComponent` |  |
| - | - |
| title: `string` | Dialog header title |
| buttons: `IEntryDialogButtonsConfig` | Dialog buttons configuration |
| disableConfirm: `bool` | Disables confirm button  |
| buttonsTemplate?: `TemplateRef<>` | Optional dialog buttons custom template |
