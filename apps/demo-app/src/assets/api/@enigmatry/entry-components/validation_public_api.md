# Module: validation/public-api

## Classes

### EntryDisplayControlValidationDirective

A directive that displays configured validation messages or server side validations for given form control.
The messages are separated with coma(,) and displayed as _innerHTML_ value of host component.

#### Example

```html
<div entryDisplayControlValidation [control]="myForm.controls.firstName">
</div
```

#### Implements

- `OnInit`
- `OnDestroy`

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `control` | `AbstractControl`\< `any`, `any` \> | Form control for which the validation messages are displayed for. |

***

### EntryFormErrorsComponent

A component used to display generic (form level) server side validation messages.
The messages are displayed as a list, each message in a new row.

#### Example

```html
<entry-form-errors [form]="myForm">
</entry-form-errors>
```

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `form` | `UntypedFormGroup` | A form group for which the validation errors are being displayed. |

***

### EntryValidationConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `validationMessages` | [`IEntryValidationMessage`](validation_public_api.md#ientryvalidationmessage)[] | Validation key to message configuration on module level. Used to configure client side validation messages<br />for standard validators (_required_, _minLength_, _email_, etc.).<br /><br />**NOTE:** If using _Formly_ package to render forms, this configuration should not be used.<br />Instead, use `FormlyModule` to configure validation messages.<br /><br />**Example**<br /><br />` new EntryValidationConfig() {   validationMessages: [     { name: 'required': message: 'This field is mandatory' },     { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}`}   ] } ` |

## Interfaces

### IEntryValidationMessage

Used to configure mapping between validation keys and messages

#### Properties

| Property | Type | Description |
| :------ | :------ | :------ |
| `message` | `string` \| (`control`) => `string` | Validation message. Can be static string or expression returning string<br /> (when messages need to be resolved dynamically: parametrization, localization, etc.). |
| `name` | `string` | Validation key (e.g. '_required_', '_minlength_', '_email_', etc.) |

***

### IValidationProblemDetails

Defines the api used as a container for server side validation errors.

## Variables

### ENTRY\_VALIDATION\_CONFIG

> `const` **ENTRY\_VALIDATION\_CONFIG**: `InjectionToken`\< [`EntryValidationConfig`](validation_public_api.md#entryvalidationconfig) \>

Entry validation injection token of EntryValidationConfig type containing validation default configurations.
Can be updated with custom configuration.

Defaults:
- validationMessages: []

***

### FORM\_FIELD\_ERROR\_KEY

> `const` **FORM\_FIELD\_ERROR\_KEY**: `"fromServer"` = `'fromServer'`

A key used to map server side validation errors on form field level

## Functions

### setServerSideValidationErrors

> **setServerSideValidationErrors**(`error`, `form`): `void`

Applies validation errors received from server side to the form.
The errors are applied to multiple levels: form, form group, form array, and form field.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `error` | [`IValidationProblemDetails`](validation_public_api.md#ivalidationproblemdetails) | Server side validation errors response. |
| `form` | `UntypedFormGroup` | Form to apply validation errors to. |

#### Returns

`void`
