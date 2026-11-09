# Entry Form

Form components and helper methods used by [entry-code-generation](https://github.com/enigmatry/entry-code-generation)

## Installation

```
npm install @enigmatry/entry-form
```

Import the `EntryFormModule` in your `feature.module` or `shared.module`

```typescript
import { EntryFormModule } from '@enigmatry/entry-form';
```

##  Form component configuration in .NET Project

Create a new Class with name e.g. [MyEntity]ComponentConfiguration and implement ```IFormComponentConfiguration``` interface.

The ```FormComponentBuilder``` class provides a fluent API for configuring a form component - provides methods to configure various aspects of the form component, such as component name, feature name as well as the properties and behaviors of each form control.

```csharp
[PublicAPI]
public class Response
{
    public Guid Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public ProductType Type { get; set; }
    public string Description { get; set; } = String.Empty;
    public int Amount { get; set; }
    public DateTimeOffset? ExpiresOn { get; set; }
    public bool FreeShipping { get; set; }
}

public class ProductEditComponentConfiguration : IFormComponentConfiguration<GetProductDetails.Response>
{
    public void Configure(FormComponentBuilder<GetProductDetails.Response> builder)
    {
        builder.Component()
            .HasName("ProductEdit")
            .BelongsToFeature("Products")
            .OrderBy(OrderByType.Configuration);

        builder.InputFormControl(x => x.Name);

        builder.AutocompleteFormControl(x => x.Type)
            .WithOptions(options => options.WithFixedValues<ProductType>().WithSortKey("displayName"));

        builder.TextareaFormControl(x => x.Description)
            .WithRows(2);

        builder.FormControl(x => x.Amount)
            .WithLabel("Units")
            .WithLabelTranslationId(ProductTranslationId.Amount)
            .WithPlaceholder("Units")
            .WithPlaceholderTranslationId(ProductTranslationId.Amount);

        builder.DateTimePickerFormControl(x => x.ExpiresOn);

        builder.CheckboxFormControl(x => x.FreeShipping)
            .WithDefaultValue(true);
    }
}

```

## Run the Code Generation

Install the latest version
```
dotnet tool install enigmatry.entry.codegeneration.tools -g
```

or update existing installation
```
dotnet tool update enigmatry.entry.codegeneration.tools -g
```

Run

```
entry-codegen --source-assembly ../MyProject.CodeGeneration.Setup/bin/Debug/net7.0/MyProject.CodeGeneration.Setup.dll --destination-directory ./src/app/features
```

## Async validators and field formatting in generated forms

Generated forms that do not use Formly import two symbols from `@enigmatry/entry-form`. Both are **temporary**: generated forms currently use reactive forms, and both symbols will be replaced when generated forms migrate to signal forms (async validation through `validateAsync` / `validateHttp`, formatting through a `FormValueControl` built on `transformedValue`).

### `ENTRY_ASYNC_VALIDATOR_RESOLVER`

Named validators configured with `.WithValidators("UniqueName")` are resolved by name (camelized, e.g. `uniqueName`) into reactive-forms async validators. Provide the resolver in your app or at component level:

```typescript
import { AsyncValidatorFn } from '@angular/forms';
import { ENTRY_ASYNC_VALIDATOR_RESOLVER, EntryAsyncValidatorResolver } from '@enigmatry/entry-form';

const myAsyncValidators: Record<string, AsyncValidatorFn> = { uniqueName: myUniqueNameValidator };
const resolver: EntryAsyncValidatorResolver = name => myAsyncValidators[name];

providers: [{ provide: ENTRY_ASYNC_VALIDATOR_RESOLVER, useValue: resolver }]
```

The token has no default. Generated forms inject it optionally, and when nothing is provided named validators are skipped.

### `EntryFieldFormatDirective`

`.WithFormat(...)` renders the standalone `entryFieldFormat` directive on an `<input matInput>` or `<textarea matInput>`:

```html
<input matInput formControlName="price" type="text" inputmode="decimal"
  entryFieldFormat [entryFieldFormatDefinition]="{ name: 'currency', currencyCode: 'EUR' }">
```

It is a `ControlValueAccessor` for reactive forms:

- `number`, `currency` and `percent` show the formatted value (through Angular's `DecimalPipe`, `CurrencyPipe` and `PercentPipe`) while the field is not focused, and a plain number with the locale's decimal separator while it is. `percent` edits the percentage (`12.5` for `0.125`) and honours `multiplier`.
- Typed text must be a valid number in the locale: an optional minus sign, the currency symbol or percent sign the field displays, the locale's decimal separator, and group separators only at the locale's group positions (`1,234.5` or `1234.5` in `en`, `1.234,5` in `nl`, `12,34,567` in `en-IN`). Anything else (`1,5` in `en`, letters, exponents, non-Latin digits) sets a `null` value and the `entryFieldFormat` validation error, so a mistyped amount is never saved as a different number.
- `date`, `boolean` and custom definitions format the displayed value only. Typed text is written to the model exactly as typed.
- Only text-like inputs (`text`, `search`, `tel`, `url`, `email`, textarea) are formatted. A `type="number"` or `type="range"` input cannot display formatted text, so it shows and parses a plain number; use `type="text" inputmode="decimal"` to get formatting. Other native types such as `date` keep their raw value. Checkbox, radio and file inputs are not matched by the directive, so they keep Angular's own value accessors.
- Formatting changes the display only: the model keeps the precision that was typed (`2.499` displays as `€2.50` with `digitsInfo: '1.2-2'`).
- A `locale` in the definition must be registered with `registerLocaleData`, as for Angular's pipes.

Definition properties mirror the table's `ColumnTypeParameter`: `date` takes `format`, `timezone`, `locale`; `currency` takes `currencyCode`, `display`, `digitsInfo`, `locale`; `number` takes `digitsInfo`, `locale`; `percent` takes `digitsInfo`, `locale`, `multiplier`. Empty strings are treated as not set. The definition type accepts extra properties for custom formatters.

## Compatibility with Angular versions

| @enigmatry/entry-form | Angular version
|-|-|
|14.x| = 14
|15.x| = 15
|16.x| = 16
|17.x| = 17
|18.x| = 18
|19.x| = 19
|20.x| = 20
|21.x| = 21
|22.x| = 22

## Migrating to 22.x

`22.x` requires Angular 22, TypeScript ~6.0 and Node `^22.22.3 || ^24.15.0 || >=26.0.0`, and drops
the `@angular/animations` peer dependency. The breaking changes are shared with
`@enigmatry/entry-components` — see
[Migrating to 22.x](https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/README.md#migrating-to-22x).

## License

Apache-2 © Enigmatry
