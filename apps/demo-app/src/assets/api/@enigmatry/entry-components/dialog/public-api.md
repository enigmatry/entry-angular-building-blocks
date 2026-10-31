# dialog/public-api

## Classes

### EntryDialog

Typed handle to the dialog a component is rendered in. Create it with `injectEntryDialog()`.

#### Type Parameters

##### TData

`TData` = `void`

##### TResult

`TResult` = `boolean`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | `readonly` | `TData` | Data the dialog was opened with |  |
| <a id="submitting"></a> `submitting` | `readonly` | `Signal`\<`boolean`\> | Whether the work passed to `submit()` is still running |  |

#### Methods

##### close()

> `readonly` **close**(`result?`): `void`

Closes the dialog with a result; the opener receives `undefined` when none is given. Ignored once the dialog is closing, so the first close wins

###### Parameters

###### result?

`TResult`

###### Returns

`void`

##### submit()

> `readonly` **submit**(`work`): `Promise`\<`void`\>

Runs `work` while `submitting()` is true; ignored while earlier work runs or once the dialog is closing. The dialog stays open unless `work` closes it

###### Parameters

###### work

() => `Promise`\<`void`\>

###### Returns

`Promise`\<`void`\>

***

### EntryDialogComponent

Dialog layout: title, close button, content and confirm/cancel buttons. The dialog component that renders it
closes the dialog with its result through `injectEntryDialog()`.

#### Example

```html
<entry-dialog title="TITLE" (confirmed)="dialog.close(true)"><p>Dialog content</p></entry-dialog>
```

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="buttonsalignment"></a> `buttonsAlignment` | `readonly` | `InputSignal`\<[`EntryDialogButtonsAlignment`](#entrydialogbuttonsalignment)\> | Dialog buttons horizontal alignment |  |
| <a id="buttonstemplate"></a> `buttonsTemplate` | `readonly` | `InputSignal`\<`TemplateRef`\<`unknown`\> \| `null` \| `undefined`\> | Provide custom buttons template |  |
| <a id="cancelbuttontext"></a> `cancelButtonText` | `readonly` | `InputSignal`\<`string`\> | Cancel button label |  |
| <a id="canceled"></a> `canceled` | `readonly` | `OutputEmitterRef`\<`void`\> | Emitted when the cancel or close button is pressed; the dialog then closes with `undefined` unless a handler closed it |  |
| <a id="confirmbuttontext"></a> `confirmButtonText` | `readonly` | `InputSignal`\<`string`\> | Confirm button label |  |
| <a id="confirmed"></a> `confirmed` | `readonly` | `OutputEmitterRef`\<`void`\> | Emitted when the confirm button is pressed; the dialog stays open until it is closed with a result |  |
| <a id="disableconfirm"></a> `disableConfirm` | `readonly` | `InputSignal`\<`boolean`\> | Disable the confirm button; it stays focusable and ignores clicks and Enter |  |
| <a id="hidebuttons"></a> `hideButtons` | `readonly` | `InputSignal`\<`boolean`\> | Hide the dialog buttons |  |
| <a id="hidecancel"></a> `hideCancel` | `readonly` | `InputSignal`\<`boolean`\> | Hide the cancel button |  |
| <a id="hideclose"></a> `hideClose` | `readonly` | `InputSignal`\<`boolean`\> | Hide the close button |  |
| <a id="title"></a> `title` | `readonly` | `InputSignal`\<`string`\> | Dialog header title |  |

***

### EntryDialogConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="buttonsalignment-1"></a> `buttonsAlignment` | [`EntryDialogButtonsAlignment`](#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default 'end') |  |
| <a id="cancelbuttontext-1"></a> `cancelButtonText` | `string` | Cancel button label (default 'Cancel') |  |
| <a id="closebuttonlabel"></a> `closeButtonLabel` | `string` | Accessible label of the close button (default 'Close dialog') |  |
| <a id="confirmbuttontext-1"></a> `confirmButtonText` | `string` | Confirm button label (default 'Ok') |  |
| <a id="disableclose"></a> `disableClose` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default false) |  |
| <a id="hideclose-1"></a> `hideClose` | `boolean` | Hide the close button (default true) |  |

***

### EntryDialogService

Used to open built-in and custom entry dialogs.

#### Methods

##### closeAll()

> `readonly` **closeAll**(): `void`

Closes all opened dialogs.

###### Returns

`void`

##### open()

> `readonly` **open**\<`TData`, `TResult`\>(`component`, ...`args`): `Observable`\<`TResult` \| `undefined`\>

Opens dialog with custom component. The data and result types come from the component's `injectEntryDialog()` handle.

###### Type Parameters

###### TData

`TData`

###### TResult

`TResult`

###### Parameters

###### component

`Type`\<[`EntryDialogContent`](#entrydialogcontent)\<`TData`, `TResult`\>\>

Dialog custom component implementation

###### args

...[`EntryDialogOpenArguments`](#entrydialogopenarguments)\<`NoInfer`\<`TData`\>\>

Data for the component (required when its data type does not accept `undefined`), optionally followed by
`disableClose` to disable closing dialog when pressing escape or clicking on backdrop and `cssClass` to set custom class
to Material overlay pane

###### Returns

`Observable`\<`TResult` \| `undefined`\>

The result the component closes with, or `undefined` when the dialog is dismissed

##### openAlert()

> `readonly` **openAlert**(`data`): `Observable`\<`true` \| `undefined`\>

Opens alert dialog.

###### Parameters

###### data

[`EntryAlertDialogData`](#entryalertdialogdata)

Contains title, message and optional confirm button text

###### Returns

`Observable`\<`true` \| `undefined`\>

`true` if confirmed, `undefined` if closed with the close button, by clicking on backdrop or pressing escape

##### openConfirm()

> `readonly` **openConfirm**(`data`): `Observable`\<`boolean` \| `undefined`\>

Opens confirm dialog.

###### Parameters

###### data

[`EntryConfirmDialogData`](#entryconfirmdialogdata)

Contains title, message and optional confirm/cancel buttons text

###### Returns

`Observable`\<`boolean` \| `undefined`\>

`true` if confirmed, `false` if canceled or closed with the close button, `undefined` if closed by clicking on backdrop or pressing escape

##### openError()

> `readonly` **openError**(`data`): `Observable`\<`true` \| `undefined`\>

Opens error dialog.

###### Parameters

###### data

[`EntryErrorDialogData`](#entryerrordialogdata)

Contains title, errors and optional message and confirm button text

###### Returns

`Observable`\<`true` \| `undefined`\>

`true` if confirmed, `undefined` if closed with the close button, by clicking on backdrop or pressing escape

## Interfaces

### EntryAlertDialogData

Alert dialog data.

#### Extended by

- [`EntryConfirmDialogData`](#entryconfirmdialogdata)

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="buttonsalignment-2"></a> `buttonsAlignment?` | [`EntryDialogButtonsAlignment`](#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default from `EntryDialogConfig`) |  |
| <a id="confirmtext"></a> `confirmText?` | `string` | Confirm button label (default from `EntryDialogConfig`) |  |
| <a id="disableclose-1"></a> `disableClose?` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default from `EntryDialogConfig`) |  |
| <a id="hideclose-2"></a> `hideClose?` | `boolean` | Hide the close button (default from `EntryDialogConfig`) |  |
| <a id="message"></a> `message` | `string` | Dialog content message |  |
| <a id="title-1"></a> `title` | `string` | Dialog header title |  |

***

### EntryConfirmDialogData

Confirm dialog data. Extends EntryAlertDialogData.

#### Extends

- [`EntryAlertDialogData`](#entryalertdialogdata)

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="buttonsalignment-3"></a> `buttonsAlignment?` | [`EntryDialogButtonsAlignment`](#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`buttonsAlignment`](#buttonsalignment-2) |  |
| <a id="canceltext"></a> `cancelText?` | `string` | Cancel button label (default from `EntryDialogConfig`) | - |  |
| <a id="confirmtext-1"></a> `confirmText?` | `string` | Confirm button label (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`confirmText`](#confirmtext) |  |
| <a id="disableclose-2"></a> `disableClose?` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`disableClose`](#disableclose-1) |  |
| <a id="hideclose-3"></a> `hideClose?` | `boolean` | Hide the close button (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`hideClose`](#hideclose-2) |  |
| <a id="message-1"></a> `message` | `string` | Dialog content message | [`EntryAlertDialogData`](#entryalertdialogdata).[`message`](#message) |  |
| <a id="title-2"></a> `title` | `string` | Dialog header title | [`EntryAlertDialogData`](#entryalertdialogdata).[`title`](#title-1) |  |

***

### EntryDialogContent

A component `EntryDialogService.open()` can open: it exposes its typed dialog handle as `dialog`.

#### Type Parameters

##### TData

`TData`

##### TResult

`TResult`

#### Properties

| Property | Modifier | Type | Description | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="dialog"></a> `dialog` | `readonly` | [`EntryDialog`](#entrydialog)\<`TData`, `TResult`\> | Handle created with `injectEntryDialog()`; it has to be a public field so `open()` can infer the data and result types |  |

***

### EntryErrorDialogData

Error dialog data: the errors are listed below the optional message.

#### Extends

- `Omit`\<[`EntryAlertDialogData`](#entryalertdialogdata), `"message"`\>

#### Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="buttonsalignment-4"></a> `buttonsAlignment?` | [`EntryDialogButtonsAlignment`](#entrydialogbuttonsalignment) | Dialog buttons horizontal alignment (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`buttonsAlignment`](#buttonsalignment-2) |  |
| <a id="confirmtext-2"></a> `confirmText?` | `string` | Confirm button label (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`confirmText`](#confirmtext) |  |
| <a id="disableclose-3"></a> `disableClose?` | `boolean` | Disable closing dialog when pressing escape or clicking on backdrop (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`disableClose`](#disableclose-1) |  |
| <a id="errors"></a> `errors` | `string`[] \| [`IValidationProblemDetails`](../validation/public-api.md#ivalidationproblemdetails) | Errors to display | - |  |
| <a id="hideclose-4"></a> `hideClose?` | `boolean` | Hide the close button (default from `EntryDialogConfig`) | [`EntryAlertDialogData`](#entryalertdialogdata).[`hideClose`](#hideclose-2) |  |
| <a id="message-2"></a> `message?` | `string` | Dialog content message, shown above the errors | - |  |
| <a id="title-3"></a> `title` | `string` | Dialog header title | [`EntryAlertDialogData`](#entryalertdialogdata).[`title`](#title-1) |  |

## Type Aliases

### EntryDialogButtonsAlignment

> **EntryDialogButtonsAlignment** = `"start"` \| `"center"` \| `"end"`

Defines horizontal alignment of dialog buttons.

***

### EntryDialogOpenArguments

> **EntryDialogOpenArguments**\<`TData`\> = `undefined` *extends* `TData` ? \[`TData`, `boolean`, `string`\] : \[`TData`, `boolean`, `string`\]

Arguments of `EntryDialogService.open()` after the component; `data` is required unless the dialog's data type accepts `undefined`.

#### Type Parameters

##### TData

`TData`

## Variables

### ENTRY\_DIALOG\_CONFIG

> `const` **ENTRY\_DIALOG\_CONFIG**: `InjectionToken`\<[`EntryDialogConfig`](#entrydialogconfig)\>

Entry dialog injection token of EntryDialogConfig type containing dialog default configurations.

Defaults:
- confirmButtonText: 'Ok'
- cancelButtonText: 'Cancel'
- closeButtonLabel: 'Close dialog'
- buttonsAlignment: 'end'
- hideClose: true
- disableClose: false

## Functions

### injectEntryDialog()

> **injectEntryDialog**\<`TData`, `TResult`\>(): [`EntryDialog`](#entrydialog)\<`TData`, `TResult`\>

Creates the typed handle to the dialog a component is rendered in. Assign it to a public `dialog` field so that
`EntryDialogService.open()` infers the data and result types from the component.

#### Type Parameters

##### TData

`TData` = `void`

##### TResult

`TResult` = `boolean`

#### Returns

[`EntryDialog`](#entrydialog)\<`TData`, `TResult`\>

#### Example

```ts
readonly dialog = injectEntryDialog<EditUserData, User>();
```

***

### provideEntryDialogConfig()

> **provideEntryDialogConfig**(`config`): `Provider`

Can be used to provide entry dialog configuration.

#### Parameters

##### config

`Partial`\<[`EntryDialogConfig`](#entrydialogconfig)\>

#### Returns

`Provider`
