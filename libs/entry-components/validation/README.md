# Entry Validation

Enables configuring forms (Reactive or [Formly](https://formly.dev/) forms) so that server or client side validation errors are displayed correctly. To accomplish this, it offers the following features:

* `setValidationErrorsToForm(error, form)` - a method that maps received server side validation errors to the form and its fields.
* `entryDisplayControlValidation` - a directive that displays field level validation errors.
* `<entry-form-errors>` - a component that displays form level validation errors.
* `ENTRY_VALIDATION_CONFIG` - configuration provider used to configure default client side validation messages on module level.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/validation';
```

Styles import:

```css
@use '@enigmatry/entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

Reactive form example with configured validation components (`entryDisplayControlValidation` & `<entry-form-errors>`):

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

On submit, in case of _BadRequest (400)_ errors, response must be handled using `setValidationErrorsToForm(error, form)` method:

```ts
import { IValidationProblemDetails, setValidationErrorsToForm } from '@enigmatry/entry-components';

// ...
submitForm() {
  this._apiService.post()
    .subscribe({
      error: (error: IValidationProblemDetails) => setValidationErrorsToForm(error, this.form)
    });
}
```

## Configuration

Optionally, when using Reactive form we can configure validation messages on module level for form validators in use:

```ts
// ...
import { AbstractControl } from '@angular/forms';
import { ENTRY_VALIDATION_CONFIG, EntryValidationConfig, EntryValidationModule } from '@enigmatry/entry-components';

@NgModule({
  imports: [
    // ...
    EntryValidationModule
  ]
  providers: [
    {
      provide: ENTRY_VALIDATION_CONFIG,
      useFactory: () => new EntryValidationConfig({
        validationMessages: [
          { name: 'required', message: 'This field is mandatory!' },
          { name: 'minlength', message: (control: AbstractControl) => `Minimal length is ${control.errors.minlength.requiredLength}!`}
        ]
      })
    }
  ]
})
export class AppModule { }
```

## Microsoft WEB.API & NSwag configuration

To configure your REST API (_Microsoft WEB.API_) so it returns _Bad Request_ response in uniform format we should decorate all end-points that trigger validation with `ProducesResponseType` attribute that maps [ValidationProblemDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-7.0) to _Bad Request_ responses:

```csharp
using Microsoft.AspNetCore.Mvc;

// ...

[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
public async Task<ActionResult<Response>> Post([FromBody] Command command)
{
    // ...
}
```

When set like this, we can generate, using [NSwag](https://github.com/RicoSuter/NSwag), client side models for _Bad Request_ responses, that can be then used with `setValidationErrorsToForm(error, form)` method as input parameter.

This is because we based our `IValidationProblemDetails` interface on [ValidationProblemDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-7.0) class.
