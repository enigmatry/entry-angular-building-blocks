# validation/public-api

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

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `control` | `AbstractControl`\<`any`, `any`\> | Form control for which the validation messages are displayed for. |  |

#### Methods

##### ngOnDestroy()

> **ngOnDestroy**(): `void`

A callback method that performs custom clean-up, invoked immediately
before a directive, pipe, or service instance is destroyed.

###### Returns

`void`

###### Implementation of

`OnDestroy.ngOnDestroy`

##### ngOnInit()

> **ngOnInit**(): `void`

A callback method that is invoked immediately after the
default change detector has checked the directive's
data-bound properties for the first time,
and before any of the view or content children have been checked.
It is invoked only once when the directive is instantiated.

###### Returns

`void`

###### Implementation of

`OnInit.ngOnInit`

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

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `form` | `UntypedFormGroup` | A form group for which the validation errors are being displayed. |  |

***

### EntryValidationConfig

Used to provide default configurations on module level.

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `validationMessages` | [`IEntryValidationMessage`](public-api.md#ientryvalidationmessage)[] | Validation key to message configuration on module level. Used to configure client side validation messages for standard validators (_required_, _minLength_, _email_, etc.). **NOTE:** If using _Formly_ package to render forms, this configuration should not be used. Instead, use `FormlyModule` to configure validation messages. **Example** `new EntryValidationConfig() { validationMessages: [ { name: 'required': message: 'This field is mandatory' }, { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}`} ] }` |  |

## Interfaces

### IEntryValidationMessage

Used to configure mapping between validation keys and messages

#### Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `message` | `string` \| (`control`) => `string` | Validation message. Can be static string or expression returning string (when messages need to be resolved dynamically: parametrization, localization, etc.). |  |
| `name` | `string` | Validation key (e.g. '_required_', '_minlength_', '_email_', etc.) |  |

***

### IValidationProblemDetails

Defines the api used as a container for server side validation errors.

## Variables

### ENTRY\_VALIDATION\_CONFIG

> `const` **ENTRY\_VALIDATION\_CONFIG**: `InjectionToken`\<[`EntryValidationConfig`](public-api.md#entryvalidationconfig)\>

Entry validation injection token of EntryValidationConfig type containing validation default configurations.
Can be updated with custom configuration.

Defaults:
- validationMessages: []

***

### FORM\_ERROR\_KEY

> `const` **FORM\_ERROR\_KEY**: `"general"` = `'general'`

A key used to map server side validation errors on form level

***

### FORM\_FIELD\_ERROR\_KEY

> `const` **FORM\_FIELD\_ERROR\_KEY**: `"fromServer"` = `'fromServer'`

A key used to map server side validation errors on form field level

## Functions

### provideEntryValidationConfig()

> **provideEntryValidationConfig**(`config`): `Provider`

Can be used to provide entry validation configuration.

#### Parameters

• **config**: `Partial`\<[`EntryValidationConfig`](public-api.md#entryvalidationconfig)\>

#### Returns

`Provider`

***

### setServerSideValidationErrors()

> **setServerSideValidationErrors**(`error`, `form`): `void`

Applies validation errors received from server side to the form.
The errors are applied to multiple levels: form, form group, form array, and form field.

#### Parameters

• **error**: [`IValidationProblemDetails`](public-api.md#ivalidationproblemdetails)

Server side validation errors response.

• **form**: `UntypedFormGroup`

Form to apply validation errors to.

#### Returns

`void`
