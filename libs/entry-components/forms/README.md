# Entry forms POC

Current solution with formly and code generator is not optimal. We should consider a better approach.

## Creating our own form controls

- To reduce boilerplate code
- To have consistent look & feel and easier theming
- To have consistent validation and error display

Controls would wrap existing material controls:

```html
<mat-form-field class="entry-input-field">
  <mat-label>{{ label }}</mat-label>
  <input
    matInput
    [formControl]="control"
    [name]="name"
    [type]="type"
    [placeholder]="placeholder"
    [required]="required"
    [attr.minLength]="minLength"
    [attr.maxLength]="maxLength"
    (input)="handleInput($event)"
    (blur)="onTouched()"
    />
  <mat-hint>{{ hint }}</mat-hint>
  <mat-error>...</mat-error>
</mat-form-field>

=>

<entry-input label="Name"></entry-input>

```

It should be possible to use them with template driven or reactive form:

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
  <entry-input label="First Name" formControlName="firstName"></entry-input>
  <entry-input label="Last Name" formControlName="lastName"></entry-input>

  <div formGroupName="address">
    <entry-input label="Street" formControlName="street"></entry-input>
    <entry-input label="Last Name" formControlName="city"></entry-input>
    <entry-input label="State" formControlName="state"></entry-input>
    <entry-input label="Zip" formControlName="zip"></entry-input>
  </div>

  <button mat-button entry-submit-button type="submit">Submit</button>
</form>
```

## Build forms from a configuration

It should be possible to create form from configuration only.

```ts
profile: UserProfile;

formConfig = [
   {
     type: 'input',
     name: 'firstName'
     label: 'First Name',
     required: true
   },
   {
     type: 'input',
     name: 'lastName'
     label: 'Last Name',
     required: true
   }
   ...
 ];
```

```html
<entry-dynamic-form [formConfig]="formConfig" [model]="profile"></entry-dynamic-form>
```

## Build form configuration using a builder
 
```ts
interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const userForm = 
  FormBuilder<UserProfile>()
    .firstName()
      .label('First name')
      .validators(Validators.required)
    .lastName()
      .label('Last name')
      .validators(Validators.required)
    .build();
```

Do we need a builder? Perhaps to and infer propertyNames and types:

```ts
// all properties are added to form?
const userForm = 
  FormBuilder<UserProfile>()
    .build();
```

## Or code generator

Current version of the code generator is a builder for formly configuration with some extra features.

Should we create C# configuration classes from typescript classes and then create a builder for them?

If we only have a builder for configuration do we need a code generator?