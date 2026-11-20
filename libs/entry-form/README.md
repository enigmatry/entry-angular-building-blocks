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
