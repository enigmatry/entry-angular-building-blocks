# Entry form controls POC

Describe purpose of the POC.

Describe issues with current solution using formly and code generator.
- Removing dependency on formly
- Multiple hoops while developing: 1. entry component 2. formly wrapper for entry component 3. code generator component configuration
- Form controls are not reusable outside generated code
- A lot of documentation need about how to use and how to extend/modify generated code
- Difficulties with theming, formly adds extra wrapper elements to already complex material structure
- Not a good solution going forward

## Creating entry form controls

Controls would wrap existing material controls to reduce boilerplate code.
Also provide consistent way of handling theming and validation display.

What to cover in the POC?

- We can create entry controls that wrap material controls (done)
- Controls can be used to with reactive or template driven form (done)

```html
<!-- mat form field -->
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
    />
  <mat-hint>{{ hint }}</mat-hint>
  <mat-error>...</mat-error>
</mat-form-field>

=> 

<!-- using <entry-input> instead -->
<entry-input label="Name"></entry-input>

```
It should be possible to use them with template driven or reactive form.

```html
<form [formGroup]="form" novalidate>

  <entry-input label="Name" formControlName="name"></entry-input>
  <entry-select label="Type" formControlName="type" [options]="types"></entry-select>
  <entry-textarea label="Description" formControlName="description"></entry-textarea>
  <entry-date-picker labe="Delivery date" formControlName="deliveryDate"></entry-date-picker>
  <entry-checkbox label="Free shipping" formControlName="freeShipping"></entry-checkbox>

  <div class="action-buttons">
    <button mat-button entry-submit-button type="submit">Submit</button>
    <button mat-button entry-cancel-button (click)="form.reset()">Cancel</button>
  </div>
</form>
```

Minimal working example for standard controls can be found here [entry-components/forms/controls](https://github.com/enigmatry/entry-angular-building-blocks/tree/features/dynamic-form-poc/libs/entry-components/forms/controls)

- entry-input
- entry-select
- entry-checkbox
- entry-date-picker
- entry-checkbox
- entry-autocomplete

Example using controls with reactive form: [reactive-form-example](https://github.com/enigmatry/entry-angular-building-blocks/blob/features/dynamic-form-poc/apps/demo-app/src/app/examples/dynamic-form/reactive/reactive-form-example.component.html)

Example using controls with template driven form: [template-driven-form-example](https://github.com/enigmatry/entry-angular-building-blocks/blob/features/dynamic-form-poc/apps/demo-app/src/app/examples/dynamic-form/template-driven/template-driven-form-example.component.html)


## Build forms from configuration

Do we need to build forms from configuration?
- To support migrating existing code generator configurations.
- To support creating form configurations using a tool or code generator.

What to cover in the POC?
- We can create form from configuration (TODO)

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
 
Do we need to create configuration builder?
- Configuration builder in TS to replace C# configuration builder? 
- Property names and type can be derived from TS class. Builder could reduce configuration steps?

What to cover in the POC?
- Create a form configuration builder (TODO)
 
```ts
class UserProfile {
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

```ts
// all properties are added to form?
const userForm = 
  FormBuilder<UserProfile>()
    .build();
```

## Build form using a code generator

Do we need to build form using a code generator?
- Current code generator is a builder for formly configuration with some extra features.
- Should we create C# builder for new typescript configurations?

How to migrate existing configurations to new solution:
- TODO