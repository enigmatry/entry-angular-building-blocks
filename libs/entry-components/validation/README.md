# Entry Validation

These components are used to apply server side validation messages, supplied in form of [Microsoft.AspNetCore.Mvc.ValidationProblemDetails](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.validationproblemdetails?view=aspnetcore-7.0), to the forms.

The validation errors can be applied on form or form field level.

* `<entry-form-errors>` component is used to render form level errors.
* `<entry-form-field-errors>` component is used to render form field level errors.

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

1st, all API end-points that will be validated should be decorated with `ProducesResponseType` attribute that will map _BadRequest (400)_ errors to `ValidationProblemDetails` model. This is required, when using _NSwag_ so it knows how to generate 400 error response models:

```csharp
using Microsoft.AspNetCore.Mvc;

// ...

[ProducesResponseType(typeof(ValidationProblemDetails), StatusCodes.Status400BadRequest)]
public async Task<ActionResult<Response>> Post([FromBody] Command command)

// ...
```

Then, Formly needs to be configured so it knows how to map server side errors to the fields:

```ts
import { EntryValidationModule, FORM_FIELD_ERROR_KEY } from '@enigmatry/entry-components';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyMaterialModule } from '@ngx-formly/material';

// ...

@NgModule({
    // ...
    imports: [
        EntryValidationModule,
        FormlyMaterialModule,
        FormlyModule.forChild({
        validationMessages: [
            { name: FORM_FIELD_ERROR_KEY, message: (error, _) => error }
        })
    ]
    // ...
})
export class AppModule { }
```

Generated form component template with `entry-form-errors` component that displays form level server validations:

```html
<app-g-product-edit #editComponent [model]="model"></app-g-product-edit>
<!-- Renders form level server side validation errors -->
<entry-form-errors [form]="form"></entry-form-errors>
```

And the last step, form submit _BadRequest (400)_ errors should be handled using `handleValidationProblemDetails()` method:

```ts
import { IValidationProblemDetails, handleValidationProblemDetails } from '@enigmatry/entry-components';

// ...
submitForm() {
  this._apiService.post()
    .subscribe({
      error: (error: IValidationProblemDetails) => handleValidationProblemDetails(this.form, error)
    });
}
```
