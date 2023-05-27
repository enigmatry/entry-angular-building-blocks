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
    });
}
```

## Components

### **EntryDialogComponent**

Base entry dialog component. Must be extended when building custom dialogs.

Inputs:

|Name|Type|Description|
|:------|:------|:------|
|`title`|`string`|Dialog header title|
|`buttonsAlignment`|`EntryDialogButtonsAlignment`|Dialog buttons horizontal alignment|
|`confirmButtonText`|`string`|Confirm button label|
|`cancelButtonText`|`string`|Cancel button label|
|`hideButtons`|`boolean`|Show or hide dialog buttons|
|`hideCancel`|`boolean`|Show or hide dialog cancel button|
|`hideClose`|`boolean`|Show or hide dialog close button|
|`disableClose`|`boolean`|Disable closing dialog when pressing escape or clicking on backdrop|
|`disableConfirm`|`boolean`|Enable or disable dialog confirm button|
|`buttonsTemplate`|`TemplateRef<any>` \| `null` \| `undefined`|Provide custom buttons template|

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

## Classes

### **EntryDialogConfig**

Used to provide default configurations on module level.

Fields:

|Name|Type|Default value|Description|
|:------|:------|:------|:------|
|`confirmButtonText`|`string`|'Ok'|Confirm button label|
|`cancelButtonText`|`string`|'Cancel'|Cancel button label|
|`buttonsAlignment`|`EntryDialogButtonsAlignment`|'align-right'|Dialog buttons horizontal alignment|
|`hideClose`|`boolean`|true|Determines if close button is visible|
|`disableClose`|`boolean`|false|Disable closing dialog when pressing escape or clicking on backdrop|

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
| `component` | `Type<EntryDialogComponent>` | | Dialog custom component implementation |
| `data` | `unknown` | `undefined` | Optional parameter used to supply component with input parameters |
| `disableClose` | `undefined` \| `boolean` | `undefined` | Optional parameter that disable closing dialog when pressing escape or clicking on backdrop |
| `cssClass` | `string` | `''` | Optional parameter used to set custom class to Material overlay pane |

#### Returns

`Observable<any>`

Any result custom implementation provides

___

### openAlert

▸ **openAlert**(`data`): `Observable`<`undefined` \| ``true``\>

Opens alert dialog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial<IEntryAlertDialogData>` | Contains title, message and other optional parameters |

#### Returns

`Observable<undefined | true>`

`true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape

___

### openConfirm

▸ **openConfirm**(`data`): `Observable`<`undefined` \| `boolean`\>

Opens confirm dialog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial<IEntryConfirmDialogData>` | Contains title, message and other optional parameters |

#### Returns

`Observable<undefined | boolean>`

`true` if confirmed, `false` if canceled or closed, `undefined` if closed by clicking on backdrop or pressing escape

## Interfaces

### **IEntryAlertDialogData**

Alert dialog data.

Fields:

|Name|Type|Description|
|:------|:------|:------|
|`title`|`string`|Dialog header title|
|`message`|`string`|Dialog content message|
|`buttonsAlignment`|`EntryDialogButtonsAlignment` \| `undefined`|Optional dialog buttons horizontal alignment|
|`confirmText`|`string` \| `undefined`|Optional dialog confirm text label|
|`hideClose`|`boolean` \| `undefined`|Optionally show or hide dialog close button|
|`disableClose`|`boolean` \| `undefined`|Optionally disable closing dialog when pressing escape or clicking on backdrop|

___

### **IEntryConfirmDialogData**

Confirm dialog data. Extends `IEntryAlertDialogData`.

Fields:

|Name|Type|Description|
|:------|:------|:------|
|`title`|`string`|Dialog header title|
|`message`|`string`|Dialog content message|
|`buttonsAlignment`|`EntryDialogButtonsAlignment` \| `undefined`|Optional dialog buttons horizontal alignment|
|`confirmText`|`string` \| `undefined`|Optional dialog confirm text label|
|`cancelText`|`string` \| `undefined`|Optional dialog cancel text label|
|`hideClose`|`boolean` \| `undefined`|Optionally show or hide dialog close button|
|`disableClose`|`boolean` \| `undefined`|Optionally disable closing dialog when pressing escape or clicking on backdrop|
