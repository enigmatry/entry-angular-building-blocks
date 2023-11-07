# Entry Validation

Enables configuring forms (Reactive or [Formly](https://formly.dev/)) so that server or client side validation errors are displayed correctly. To accomplish this, it offers the following features:

* `setServerSideValidationErrors(error, form)` - a method that maps received server side validation errors to the form and its fields.
* `entryDisplayControlValidation` - a directive that displays field level validation errors.
* `<entry-form-errors>` - a component that displays form level validation errors.
* `ENTRY_VALIDATION_CONFIG` - configuration provider used to configure default client side validation messages on module level.

## Integration

```npm
npm i @enigmatry/entry-components
```

Import component package:

```ts
import { EntryValidationModule } from '@enigmatry/entry-components/validation';
```

Styles import:

```css
@use '@enigmatry/entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

Add `entryDisplayControlValidation` & `<entry-form-errors>` elements to the form to support validation error messages:

```html
<form [formGroup]="form" (ngSubmit)="submitForm()">
    <mat-form-field class="example-form-field">
        <mat-label>First name</mat-label>
        <input matInput type="text" formControlName="firstName">
        <mat-error entryDisplayControlValidation [control]="form.controls.firstName"></mat-error>
    </mat-form-field>

    <entry-form-errors [form]="form"></entry-form-errors>

    <button mat-flat-button color="accent" type="submit">Submit</button>
</form>
```

On submit handle _BadRequest (400)_ response using `setServerSideValidationErrors(error, form)` method:

```ts
import { IValidationProblemDetails, setServerSideValidationErrors } from '@enigmatry/entry-components/validation';

// ...
submitForm() {
  this._apiService.post()
    .subscribe({
      error: (error: IValidationProblemDetails) => setServerSideValidationErrors(error, this.form)
    });
}
```

## Configuration

Optionally, when using Reactive form, client side validation messages can be configured on module level:

```ts
// ...
import { AbstractControl } from '@angular/forms';
import { EntryValidationModule, provideEntryValidationConfig } from '@enigmatry/entry-components/validation';

@NgModule({
  imports: [
    // ...
    EntryValidationModule
  ]
  providers: [
    provideEntryValidationConfig({
      validationMessages: [
        { name: 'required', message: 'This field is mandatory!' },
        { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}!` }
      ]
    })
  ]
})
export class AppModule { }
```

## Microsoft WEB.API & NSwag configuration

To configure REST API (_Microsoft WEB.API_) to return _Bad Request_ responses in uniform format, decorate all end-points that trigger validation with `ProducesResponseType` attribute that maps [ValidationProblemDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-7.0) to _Bad Request_ responses:

```csharp
using Microsoft.AspNetCore.Mvc;

// ...

[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
public async Task<ActionResult<Response>> Post([FromBody] Command command)
{
    // ...
}
```

When set like this, generated ([NSwag](https://github.com/RicoSuter/NSwag)) client side models for _Bad Request_ responses can be used as input parameter of `setServerSideValidationErrors(error, form)` method.

This is because `IValidationProblemDetails` interface is based on [ValidationProblemDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-7.0) class.
