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

Maps add up. Maps provided in the same place are combined. A name that a map does not contain is looked up in the resolver Angular finds next above it, as for any provider: for a component that is the nearest ancestor component that provides one, otherwise the route or the application. That resolver continues from the place where it was provided, so a route's map is not reached through a resolver of the component that holds the `<router-outlet>`. Where two maps contain a name, the one provided last, or nearest to the form, wins. A name that no map on that path contains is skipped, with a warning in development mode, so the form still renders.

The token has no default. Generated forms inject it optionally, and when nothing is provided named validators are skipped. To resolve names yourself, provide a function `(name: string) => AsyncValidatorFn` through `ENTRY_ASYNC_VALIDATOR_RESOLVER` directly; it must return a validator for every name, because generated forms pass the results to `FormControl` in an array, and Angular throws on an `undefined` entry.

### `EntryFieldFormatDirective`

`.WithFormat(...)` renders the standalone `entryFieldFormat` directive on an `<input matInput>` or `<textarea matInput>`:

```html
<input matInput formControlName="price" type="text" inputmode="decimal"
  entryFieldFormat [entryFieldFormatDefinition]="{ name: 'currency', currencyCode: 'EUR' }">
```

It is a `ControlValueAccessor` for reactive forms and takes the place of Angular's own accessor for a text or number input. It goes on plain inputs and textareas only: an input with another custom value accessor, such as `matDatepicker` or `matAutocomplete`, cannot take a second one (Angular throws in development mode).

- `number`, `currency` and `percent` show the formatted value (through Angular's `DecimalPipe`, `CurrencyPipe` and `PercentPipe`) while the field is not focused, and a plain number with the locale's decimal separator and minus sign while it is. When the browser has selected the field's text on focus, as it does for a field the user tabs into, the plain number is selected too, so typing replaces it (an `email` input does not expose its selection, so there the caret moves to the end). `percent` edits the percentage (`12.5` for `0.125`) and honours `multiplier`. An emptied field is `null` without an error, so a required field still needs `Validators.required`. A read-only field keeps showing the formatted value when focused, however `readonly` is set (`readonly`, `[readonly]`, `[attr.readonly]`, or `matInput`, including `disabledInteractive` on a disabled control).
- In text-like fields, typed text must be a valid number in the locale: an optional minus sign, the currency symbol or percent sign the field displays, the locale's decimal separator, and group separators only at the locale's group positions (`1,234.5` or `1234.5` in `en`, `1.234,5` in `nl`, `12,34,567` in `en-IN`). Inside the amount, a space counts only as the locale's group separator, one per group (spaces around the amount, a currency symbol or a minus sign are fine). Anything else (`1,5` in `en`, letters, exponents, non-Latin digits, a line break inside the number) sets a `null` value and the `entryFieldFormat` validation error. So does a number that would not read back as typed: a JavaScript number keeps about 15 to 17 significant digits, so `9007199254740993` (stored as `9007199254740992`), `1000000000000000128` (shown as `1000000000000000100`), a decimal too long to store, or a nonzero amount too small to store are rejected rather than changed. A typed amount is therefore saved, and shown while editing, as the number it reads as (`001.20` is `1.2`), except through a `percent` multiplier that is not a power of ten (see the multiplier rules below); the unfocused display still rounds to the definition's digits. A value too large for the locale's number format (Angular switches to exponent notation beyond 22 digits) is shown as a plain number instead. A model value that is a numeric string is formatted like a number when it reads back as the same number (`'12.50'` as 12.5); a string with more digits than a JavaScript number keeps (`'9007199254740993'`) is shown as it is.
- `date` and `boolean` definitions format the displayed value only: typed text is written to the model exactly as typed, so they suit read-only and disabled fields, and a date the user edits needs a date picker. A `date` definition formats `Date` objects, timestamps and ISO 8601 strings in the extended format (with hyphens and colons), written as a date (`2026-11-06`) or as a date and time (`2026-11-06T09:15`, optionally with seconds, a fraction and `Z` or an offset, as in `2026-11-06T09:15:00+01:00`); any other string, such as a timestamp written as text, a date typed in the displayed format or a day its month does not have (`2026-02-30`), is shown as it is. A `boolean` definition shows a check mark for `true`, nothing for `false`, and any other value as text. While such a field has focus and can be edited, a string value is shown as it is stored (an ISO date as its ISO text) and any other value stays formatted, so typing over a `Date` replaces it with text.
- Any other `name` is not formatted: the value is shown as text and typed text is written to the model as typed.
- Only text-like inputs (`text`, `search`, `tel`, `url`, `email`, textarea) are formatted. A `type="number"` or `type="range"` input cannot display formatted text, so it shows and parses a plain number in the browser's own number syntax (which accepts exponents, so `1e3` is 1000; a range input also keeps the value within its `min`, `max` and `step`), still rejecting a number that would not read back as typed (a percentage beyond the largest JavaScript number cannot be shown in one at all); use `type="text" inputmode="decimal"` to get formatting. Angular's validators see the model value, not the displayed percentage (with the default multiplier, `Validators.max(1)` is 100%), and the `min` and `max` attributes of a number input, which the browser reads as displayed percentages, do not fit a `percent` definition. Other native types such as `date` keep their raw value. Checkbox, radio and file inputs are not matched by the directive, so they keep Angular's own value accessors.
- Formatting changes the display only: the model keeps the precision that was typed (`2.499` displays as `€2.50` with `digitsInfo: '1.2-2'`).
- A `locale` in the definition must be registered with `registerLocaleData`, as for Angular's pipes.
- Outside an IME composition, an input event that leaves the field as it was last parsed or shown changes nothing: no value is emitted and the control is not marked dirty. An IME can send such an event after a composition has ended, and typing the exact text the field already shows is one too.
- Text that changes while the field is not focused (browser autofill, a script that dispatches an `input` event, text an IME delivers after the field was left) is handled as a blur handles typed text: it is parsed, Angular's blur handling runs for the control as after a real blur (it is marked touched and an `updateOn: 'blur'` control takes the value; an `updateOn: 'submit'` control waits for the submit for both), and a value that parsed is shown formatted.
- The field is rendered again when a definition with another `name`, `format`, `timezone`, `locale`, `currencyCode`, `display`, `digitsInfo` or `multiplier` is bound: text that did not parse is parsed again, and a value that did parse is kept as it is. Another object with the same settings changes nothing, so a binding that builds the definition on every change detection does not disturb typing. A change made inside the bound object is not seen until another object is bound, because an Angular input changes by reference.
- Known limits: the input's `type` must be a literal attribute that does not change at runtime: a bound `[type]` is not seen by the check that leaves checkbox, radio and file inputs to Angular (use separate template branches for a field that switches type). A percentage typed with 17 significant digits can be shown with its last digit rounded the other way (`12345678912345.254` with `multiplier: 0.01` and `digitsInfo: '1.2-2'` is shown as `12,345,678,912,345.26%`); the model keeps the typed value. With a `multiplier` that is not a power of ten, a percentage beyond the largest JavaScript number is shown as `Infinity`, text the field does not accept back. A model value outside the `min` and `max` of a range input is shown at the nearest end while the model keeps it, until the user moves the slider to another position. A field that is disabled while it has focus shows the formatted value; with `updateOn: 'blur'`, a value typed since the last blur is committed by the next blur event, as with Angular's own inputs (Chrome sends that event when the focused field is disabled). Disabling the control sets the element's `disabled` property, as Angular's own value accessors do, so a `matInput` with `disabledInteractive` is natively disabled when its control is disabled after it was created.

Definition properties follow the table's column types: `date` takes `format`, `timezone`, `locale`; `currency` takes `currencyCode`, `display`, `digitsInfo`, `locale`; `number` takes `digitsInfo`, `locale`; `percent` takes `digitsInfo`, `locale`, `multiplier`. Empty strings are treated as not set, and what is not set falls back to the default of Angular's pipe (`PercentPipe` shows whole percentages, so `0.125` is `13%` without `digitsInfo`). `multiplier` is 1 when not set; the table's `DEFAULT_PERCENTAGE_MULTIPLIER` is not read. The definition type accepts extra properties, which a generator may emit for its own formatters; the directive does not read them. A custom currency `display` label should not contain digits, a minus sign (`-`, or the locale's own minus such as `−`) or the locale's decimal separator: depending on the locale, the label's position and `digitsInfo`, it can be mistaken for part of the amount when the formatted text is pasted back. In `en`, `23` formats as `123.00` with `display: '1'` and parses as 123, as `-23.00` with `display: '-'` and parses as −23, and as `.23` with `display: '.'` and `digitsInfo: '1.0-0'` and parses as 0.23. Typing a plain number is unaffected. A `multiplier` is applied as given, so `0` shows every value as `0%` and rejects typed values; one written with more digits than a JavaScript number keeps (a C# `decimal` can have 28) is read as the nearest number. A power of ten (`1`, `0.01`, `100`) converts exactly; any other multiplier goes through floating-point arithmetic, so the value shown while editing can carry binary noise (`370370367.29999995`) and a re-entered value can differ from the stored one in its last binary digit.

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
the `@angular/animations` peer dependency. Most breaking changes are shared with
`@enigmatry/entry-components` — see
[Migrating to 22.x](https://github.com/enigmatry/entry-angular-building-blocks/blob/master/libs/entry-components/README.md#migrating-to-22x).

### No more `any` in the public types

Beyond the changes shared with `@enigmatry/entry-components`, this package's own types lost their
`any`. Generated forms are unaffected.

| Symbol | 21.4.0 | 22.0.0 | What to do |
|---|---|---|---|
| `SelectOption` | `value?: any` | `SelectOption<T = unknown>`, `value?: T`; also exported from `@enigmatry/entry-form` | write `SelectOption<YourType>`, or narrow `option.value` before use |
| `SelectConfiguration` | not generic | `SelectConfiguration<T = unknown, TKey extends string = string>`: `emptyOption` and `disable` see `SelectOption<T>`; the property names are `TKey` | a `disable` that reads `option.value` narrows it, or declares the configuration as `SelectConfiguration<YourType>` |
| `findOptionByValue`, `findOptionByLabel` | return `SelectOption` | generic, return the option type you pass in; `findOptionByValue` takes a value of that option's value type | declare an inline or empty list as `SelectOption<YourType>[]`, so the result keeps every `SelectOption` member |
| `sortOptions` | `(options: SelectOption[] \| any[], …): SelectOption[] \| any[]` | `<T extends object>(options: readonly T[], valueProperty?: keyof T & string, …): T[]` | see below |
| `IFieldPropertyExpressionDictionary<T>` | `(model: T) => any` | `IFieldPropertyExpressionDictionary<T, TResult = unknown>` | give `TResult` (e.g. `string` for labels) to read the results typed |

`sortOptions` returns the type you pass in, and its property names must be keys of that type, so
with typed options a misspelled name no longer compiles. With typed options, a property name held in a plain `string`
does not compile either: pass a literal, or take it from a `SelectConfiguration<TValue, keyof MyOption & string>`,
whose property names are then keys of `MyOption`. An array of strings or numbers is rejected: the function sorts objects by a property.

## About Enigmatry

Entry is the open-source foundation Enigmatry builds client systems on. Enigmatry is a software company from Rotterdam, founded in 2006, with teams in Belgrade and Novi Sad.

* How we use Entry for clients: https://www.enigmatry.com/en/entry/
* How we build, with agents under checks: https://www.enigmatry.com/en/how-we-build/

Apache-2.0 © Enigmatry
