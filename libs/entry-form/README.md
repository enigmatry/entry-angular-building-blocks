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

### `ENTRY_ASYNC_VALIDATOR_RESOLVER` and `provideEntryAsyncValidators`

Named validators configured with `.WithValidators("UniqueName")` are resolved by name (camelized, e.g. `uniqueName`) into reactive-forms async validators. Register them in your app or at component level:

```typescript
import { provideEntryAsyncValidators } from '@enigmatry/entry-form';

providers: [provideEntryAsyncValidators({ uniqueName: myUniqueNameValidator })]
```

A name the map does not contain is skipped, with a warning in development mode, so the form still renders.

The token has no default. Generated forms inject it optionally, and when nothing is provided named validators are skipped. To resolve names yourself, provide a function `(name: string) => AsyncValidatorFn` through `ENTRY_ASYNC_VALIDATOR_RESOLVER` directly; it must return a validator for every name, because generated forms pass the results straight to `FormControl`, which fails on `undefined`.

### `EntryFieldFormatDirective`

`.WithFormat(...)` renders the standalone `entryFieldFormat` directive on an `<input matInput>` or `<textarea matInput>`:

```html
<input matInput formControlName="price" type="text" inputmode="decimal"
  entryFieldFormat [entryFieldFormatDefinition]="{ name: 'currency', currencyCode: 'EUR' }">
```

It is a `ControlValueAccessor` for reactive forms:

- `number`, `currency` and `percent` show the formatted value (through Angular's `DecimalPipe`, `CurrencyPipe` and `PercentPipe`) while the field is not focused, and a plain number with the locale's decimal separator while it is. `percent` edits the percentage (`12.5` for `0.125`) and honours `multiplier`. A read-only field keeps showing the formatted value when focused, however `readonly` is set (`readonly`, `[readonly]`, `[attr.readonly]`, or `matInput`, including `disabledInteractive` on a disabled control).
- In text-like fields, typed text must be a valid number in the locale: an optional minus sign, the currency symbol or percent sign the field displays, the locale's decimal separator, and group separators only at the locale's group positions (`1,234.5` or `1234.5` in `en`, `1.234,5` in `nl`, `12,34,567` in `en-IN`). Inside the amount, a space counts only as the locale's group separator, one per group (spaces around the amount, a currency symbol or a minus sign are fine). Anything else (`1,5` in `en`, letters, exponents, non-Latin digits, a line break inside the number) sets a `null` value and the `entryFieldFormat` validation error. So does a number that would not read back as typed: a JavaScript number keeps about 15 to 17 significant digits, so `9007199254740993` (stored as `9007199254740992`), `1000000000000000128` (shown as `1000000000000000100`), a decimal too long to store, or a nonzero amount too small to store are rejected rather than changed. A typed amount is therefore saved, and shown while editing, as the number it reads as (`001.20` is `1.2`), except through a `percent` multiplier that is not a power of ten (see the multiplier rules below); the unfocused display still rounds to the definition's digits. A value too large for the locale's number format (Angular switches to exponent notation beyond 22 digits) is shown as a plain number instead.
- `date`, `boolean` and custom definitions format the displayed value only. Typed text is written to the model exactly as typed.
- Only text-like inputs (`text`, `search`, `tel`, `url`, `email`, textarea) are formatted. A `type="number"` or `type="range"` input cannot display formatted text, so it shows and parses a plain number in the browser's own number syntax (which accepts exponents, so `1e3` is 1000), still rejecting a number that would not read back as typed (a percentage beyond the largest JavaScript number cannot be shown in one at all); use `type="text" inputmode="decimal"` to get formatting. Other native types such as `date` keep their raw value. Checkbox, radio and file inputs are not matched by the directive, so they keep Angular's own value accessors.
- Formatting changes the display only: the model keeps the precision that was typed (`2.499` displays as `€2.50` with `digitsInfo: '1.2-2'`).
- A `locale` in the definition must be registered with `registerLocaleData`, as for Angular's pipes.
- The definition can be a new object on every change detection; the field is rendered again only when its content changes. When the content does change while a field is focused, the text is rendered again in the new format.
- Known limits: the input's `type` must not change at runtime (use separate template branches for a field that switches between a formatted input and a checkbox, radio, file or number input). Text that a script or browser autofill puts into an unfocused field is saved, and formatted the next time the field loses focus. A percentage with more significant digits than a JavaScript number keeps (about 15) can show its last digit rounded the other way, and one beyond the largest JavaScript number cannot be edited. A field that is disabled while it has focus shows the formatted value; with `updateOn: 'blur'` a value typed since the last blur is not committed, as with Angular's own inputs.

Definition properties mirror the table's `ColumnTypeParameter`: `date` takes `format`, `timezone`, `locale`; `currency` takes `currencyCode`, `display`, `digitsInfo`, `locale`; `number` takes `digitsInfo`, `locale`; `percent` takes `digitsInfo`, `locale`, `multiplier`. Empty strings are treated as not set. The definition type accepts extra properties for custom formatters. A custom currency `display` label should not contain digits, a minus sign (`-`, or the locale's own minus such as `−`) or the locale's decimal separator: depending on the locale, the label's position and `digitsInfo`, it can be mistaken for part of the amount when the formatted text is pasted back. In `en`, `23` formats as `123.00` with `display: '1'` and parses as 123, as `-23.00` with `display: '-'` and parses as −23, and as `.23` with `display: '.'` and `digitsInfo: '1.0-0'` and parses as 0.23. Typing a plain number is unaffected. A `multiplier` is applied as given, so `0` shows every value as `0%` and rejects typed values. A power of ten (`1`, `0.01`, `100`) converts exactly; any other multiplier goes through floating-point arithmetic, so the value shown while editing can carry binary noise (`370370367.29999995`) and a re-entered value can differ from the stored one in its last binary digit.

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

## About Enigmatry

Entry is the open-source foundation Enigmatry builds client systems on. Enigmatry is a software company from Rotterdam, founded in 2006, with teams in Belgrade and Novi Sad.

* How we use Entry for clients: https://www.enigmatry.com/en/entry/
* How we build, with agents under checks: https://www.enigmatry.com/en/how-we-build/

Apache-2.0 © Enigmatry
