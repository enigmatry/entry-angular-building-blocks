# Entry Dialog

Enables working with built-in (alert and confirm) and custom dialogs. Supports dialog configuration on application level.

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

▸ **closeAll**(): `void`

Closes all opened dialogs.

#### Returns

`void`

___

### open

▸ **open**(`component`, `data?`, `disableClose?`, `cssClass?`): `Observable`<`any`\>

Opens dialog with custom component.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `component` | `Type`<`EntryDialogComponent`\> | | Dialog custom component implementation |
| `data` | `unknown` | `undefined` | Optional parameter used to supply component with input parameters |
| `disableClose` | `undefined` \| `boolean` | `undefined` | Optional parameter that disable closing dialog when pressing escape or clicking on backdrop |
| `cssClass` | `string` | `''` | Optional parameter used to set custom class to Material overlay pane |

#### Returns

`Observable`<`any`\>

Any result custom implementation provides

___

### openAlert

▸ **openAlert**(`data`): `Observable`<`undefined` \| ``true``\>

Opens alert dialog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial`<`IEntryAlertDialogData`\> | Contains title, message and optional confirm button text |

#### Returns

`Observable`<`undefined` \| ``true``\>

`true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape

___

### openConfirm

▸ **openConfirm**(`data`): `Observable`<`undefined` \| `boolean`\>

Opens confirm dialog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial`<`IEntryConfirmDialogData`\> | Contains title, message and optional confirm/cancel buttons text |

#### Returns

`Observable`<`undefined` \| `boolean`\>

`true` if confirmed, `false` if canceled or closed, `undefined` if closed by clicking on backdrop or pressing escape

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
