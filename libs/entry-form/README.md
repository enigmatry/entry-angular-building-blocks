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

## License

Apache-2 © Enigmatry
