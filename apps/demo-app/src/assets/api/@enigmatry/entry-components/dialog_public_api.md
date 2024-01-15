# Module: dialog/public-api

## Classes

### EntryDialogComponent

Base Entry dialog component. Must be extended when building custom dialogs.

#### Example

```html
<entry-dialog title="TITLE"><p>Dialog content</p></entry-dialog>
```

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](dialog_public_api.md#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment |
| `buttonsTemplate` | `TemplateRef`\< `any` \> | Provide custom buttons template |
| `cancelButtonText` | `string` | Cancel button label |
| `confirmButtonText` | `string` | Confirm button label |
| `disableConfirm` | `boolean` | Enable or disable dialog confirm button |
| `hideButtons` | `boolean` | Show or hide dialog buttons |
| `hideCancel` | `boolean` | Show or hide dialog cancel button |
| `hideClose` | `boolean` | Show or hide dialog close button |
| `title` | `string` | Dialog header title |

***

### EntryDialogConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](dialog_public_api.md#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default 'align-right') |
| `cancelButtonText` | `string` | Cancel button label (default 'Cancel') |
| `confirmButtonText` | `string` | Confirm button label (default 'Ok') |
| `disableClose` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default false) |
| `hideClose` | `boolean` | Determines if close button is visible (default is true) |

***

### EntryDialogService

Used to open built-in and custom entry dialogs.

#### Methods

##### closeAll

> **closeAll**(): `void`

Closes all opened dialogs.

###### Returns

`void`

***

##### open

> **open**(
  `component`,
  `data` = `undefined`,
  `disableClose` = `undefined`,
  `cssClass` = `''`): `Observable`\< `any` \>

Opens dialog with custom component.

###### Parameters

| Parameter | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `component` | `Type`\< [`EntryDialogComponent`](dialog_public_api.md#entrydialogcomponent) \> | `undefined` | Dialog custom component implementation |
| `data` | `unknown` | `undefined` | Optional parameter used to supply component with input parameters |
| `disableClose` | `boolean` | `undefined` | Optional parameter that disable closing dialog when pressing escape or clicking on backdrop |
| `cssClass` | `string` | `''` | Optional parameter used to set custom class to Material overlay pane |

###### Returns

`Observable`\< `any` \>

Any result custom implementation provides

***

##### openAlert

> **openAlert**(`data`): `Observable`\< `true` \>

Opens alert dialog.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial`\< [`IEntryAlertDialogData`](dialog_public_api.md#ientryalertdialogdata) \> | Contains title, message and optional confirm button text |

###### Returns

`Observable`\< `true` \>

`true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape

***

##### openConfirm

> **openConfirm**(`data`): `Observable`\< `boolean` \>

Opens confirm dialog.

###### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `data` | `Partial`\< [`IEntryConfirmDialogData`](dialog_public_api.md#ientryconfirmdialogdata) \> | Contains title, message and optional confirm/cancel buttons text |

###### Returns

`Observable`\< `boolean` \>

`true` if confirmed, `false` if canceled or closed, `undefined` if closed by clicking on backdrop or pressing escape

## Interfaces

### IEntryAlertDialogData

Alert dialog data.

#### Extended By

- [`IEntryConfirmDialogData`](dialog_public_api.md#ientryconfirmdialogdata)
- [`IEntryConfirmDialogData`](dialog_public_api.md#ientryconfirmdialogdata)

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](dialog_public_api.md#entrydialogbuttonsalignment) | Optional dialog buttons horizontal alignment |
| `confirmText`? | `string` | Optional dialog confirm text label |
| `disableClose`? | `boolean` | Optionally disable closing dialog when pressing escape or clicking on backdrop |
| `hideClose` | `boolean` | Optionally show or hide dialog close button |
| `message` | `string` | Dialog content message |
| `title` | `string` | Dialog header title |

***

### IEntryConfirmDialogData

Confirm dialog data. Extends IEntryAlertDialogData.

#### Extends

- [`IEntryAlertDialogData`](dialog_public_api.md#ientryalertdialogdata)

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](dialog_public_api.md#entrydialogbuttonsalignment) | Optional dialog buttons horizontal alignment |
| `cancelText`? | `string` | Optional dialog cancel text label |
| `confirmText`? | `string` | Optional dialog confirm text label |
| `disableClose`? | `boolean` | Optionally disable closing dialog when pressing escape or clicking on backdrop |
| `hideClose` | `boolean` | Optionally show or hide dialog close button |
| `message` | `string` | Dialog content message |
| `title` | `string` | Dialog header title |

## Type Aliases

### EntryDialogButtonsAlignment

> **EntryDialogButtonsAlignment**: `"start"` \| `"center"` \| `"end"`

Defines horizontal alignment of dialog buttons.

## Variables

### ENTRY\_DIALOG\_CONFIG

> `const` **ENTRY\_DIALOG\_CONFIG**: `InjectionToken`\< [`EntryDialogConfig`](dialog_public_api.md#entrydialogconfig) \>

Entry dialog injection token of EntryDialogConfig type containing dialog default configurations.

Defaults:
- confirmButtonText: 'Ok'
- cancelButtonText: 'Cancel'
- buttonsAlignment: 'end'
- hideClose: true
- disableClose: false

## Functions

### provideEntryDialogConfig

> **provideEntryDialogConfig**(`config`): `Provider`

Can be used to provide entry dialog configuration.

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `config` | `Partial`\< [`EntryDialogConfig`](dialog_public_api.md#entrydialogconfig) \> |

#### Returns

`Provider`
