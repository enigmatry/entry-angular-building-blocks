# dialog/public-api

## Classes

### EntryDialogComponent

Base Entry dialog component. Must be extended when building custom dialogs.

#### Example

```html
<entry-dialog title="TITLE"><p>Dialog content</p></entry-dialog>
```

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](public-api.md#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment |  |
| `buttonsTemplate` | `TemplateRef`\<`any`\> | Provide custom buttons template |  |
| `cancelButtonText` | `string` | Cancel button label |  |
| `confirmButtonText` | `string` | Confirm button label |  |
| `disableConfirm` | `boolean` | Enable or disable dialog confirm button |  |
| `hideButtons` | `boolean` | Show or hide dialog buttons |  |
| `hideCancel` | `boolean` | Show or hide dialog cancel button |  |
| `hideClose` | `boolean` | Show or hide dialog close button |  |
| `title` | `string` | Dialog header title |  |

***

### EntryDialogConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](public-api.md#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default 'align-right') |  |
| `cancelButtonText` | `string` | Cancel button label (default 'Cancel') |  |
| `confirmButtonText` | `string` | Confirm button label (default 'Ok') |  |
| `disableClose` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default false) |  |
| `hideClose` | `boolean` | Determines if close button is visible (default is true) |  |

***

### EntryDialogService

Used to open built-in and custom entry dialogs.

#### Methods

##### closeAll()

> **closeAll**(): `void`

Closes all opened dialogs.

###### Returns

`void`

##### open()

> **open**(`component`, `data`, `disableClose`, `cssClass`): `Observable`\<`any`\>

Opens dialog with custom component.

###### Parameters

• **component**: `Type`\<[`EntryDialogComponent`](public-api.md#entrydialogcomponent)\>

Dialog custom component implementation

• **data**: `unknown` = `undefined`

Optional parameter used to supply component with input parameters

• **disableClose**: `boolean` = `undefined`

Optional parameter that disable closing dialog when pressing escape or clicking on backdrop

• **cssClass**: `string` = `''`

Optional parameter used to set custom class to Material overlay pane

###### Returns

`Observable`\<`any`\>

Any result custom implementation provides

##### openAlert()

> **openAlert**(`data`): `Observable`\<`true`\>

Opens alert dialog.

###### Parameters

• **data**: `Partial`\<[`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata)\>

Contains title, message and optional confirm button text

###### Returns

`Observable`\<`true`\>

`true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape

##### openConfirm()

> **openConfirm**(`data`): `Observable`\<`boolean`\>

Opens confirm dialog.

###### Parameters

• **data**: `Partial`\<[`IEntryConfirmDialogData`](public-api.md#ientryconfirmdialogdata)\>

Contains title, message and optional confirm/cancel buttons text

###### Returns

`Observable`\<`boolean`\>

`true` if confirmed, `false` if canceled or closed, `undefined` if closed by clicking on backdrop or pressing escape

##### openError()

> **openError**(`data`): `Observable`\<`true`\>

Opens error dialog.

###### Parameters

• **data**: `Partial`\<[`IEntryErrorDialogData`](public-api.md#ientryerrordialogdata)\>

Contains title, errors and optional confirm button text

###### Returns

`Observable`\<`true`\>

`true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape

## Interfaces

### IEntryAlertDialogData

Alert dialog data.

#### Extended by

- [`IEntryConfirmDialogData`](public-api.md#ientryconfirmdialogdata)
- [`IEntryErrorDialogData`](public-api.md#ientryerrordialogdata)

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](public-api.md#entrydialogbuttonsalignment) | Optional dialog buttons horizontal alignment |  |
| `confirmText?` | `string` | Optional dialog confirm text label |  |
| `disableClose?` | `boolean` | Optionally disable closing dialog when pressing escape or clicking on backdrop |  |
| `hideClose` | `boolean` | Optionally show or hide dialog close button |  |
| `message` | `string` | Dialog content message |  |
| `title` | `string` | Dialog header title |  |

***

### IEntryConfirmDialogData

Confirm dialog data. Extends IEntryAlertDialogData.

#### Extends

- [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](public-api.md#entrydialogbuttonsalignment) | Optional dialog buttons horizontal alignment | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`buttonsAlignment` |  |
| `cancelText?` | `string` | Optional dialog cancel text label | - |  |
| `confirmText?` | `string` | Optional dialog confirm text label | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`confirmText` |  |
| `disableClose?` | `boolean` | Optionally disable closing dialog when pressing escape or clicking on backdrop | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`disableClose` |  |
| `hideClose` | `boolean` | Optionally show or hide dialog close button | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`hideClose` |  |
| `message` | `string` | Dialog content message | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`message` |  |
| `title` | `string` | Dialog header title | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`title` |  |

***

### IEntryErrorDialogData

Error dialog data.

#### Extends

- [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| `buttonsAlignment` | [`EntryDialogButtonsAlignment`](public-api.md#entrydialogbuttonsalignment) | Optional dialog buttons horizontal alignment | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`buttonsAlignment` |  |
| `confirmText?` | `string` | Optional dialog confirm text label | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`confirmText` |  |
| `disableClose?` | `boolean` | Optionally disable closing dialog when pressing escape or clicking on backdrop | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`disableClose` |  |
| `errors` | `string`[] \| [`IValidationProblemDetails`](../validation/public-api.md#ivalidationproblemdetails) | Errors to display | - |  |
| `hideClose` | `boolean` | Optionally show or hide dialog close button | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`hideClose` |  |
| `message` | `string` | Dialog content message | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`message` |  |
| `title` | `string` | Dialog header title | [`IEntryAlertDialogData`](public-api.md#ientryalertdialogdata).`title` |  |

## Type Aliases

### EntryDialogButtonsAlignment

> **EntryDialogButtonsAlignment**: `"start"` \| `"center"` \| `"end"`

Defines horizontal alignment of dialog buttons.

## Variables

### ENTRY\_DIALOG\_CONFIG

> `const` **ENTRY\_DIALOG\_CONFIG**: `InjectionToken`\<[`EntryDialogConfig`](public-api.md#entrydialogconfig)\>

Entry dialog injection token of EntryDialogConfig type containing dialog default configurations.

Defaults:
- confirmButtonText: 'Ok'
- cancelButtonText: 'Cancel'
- buttonsAlignment: 'end'
- hideClose: true
- disableClose: false

## Functions

### provideEntryDialogConfig()

> **provideEntryDialogConfig**(`config`): `Provider`

Can be used to provide entry dialog configuration.

#### Parameters

• **config**: `Partial`\<[`EntryDialogConfig`](public-api.md#entrydialogconfig)\>

#### Returns

`Provider`
