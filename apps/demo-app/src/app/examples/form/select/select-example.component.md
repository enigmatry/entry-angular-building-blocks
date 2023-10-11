
```csharp
public enum ProductType
{
    Food = 0,
    Drink = 1,
    Book = 2,
    Car = 3,
}

// Single select
builder.SelectFormControl(x => x.Type)
    .WithOptions(options => options.WithFixedValues<ProductType>()
    .WithSortKey("displayName"));

// Multi-select
builder.MultiSelectFormControl(x => x.Type)
    .WithOptions(options => options.WithFixedValues<ProductType>()
    .WithSortKey("displayName"));
           
// Autocomplete
builder.AutocompleteFormControl(x => x.Type)
    .WithOptions(options => options.WithFixedValues<ProductType>()
    .WithSortKey("displayName"));
```