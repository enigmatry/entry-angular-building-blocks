
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

// Grouped single select - dynamic options
builder.SelectFormControl(x => x.CategoryId)
    .WithOptions(options => options.WithDynamicValues()
    .WithValueKey("id")
    .WithDisplayKey("categoryName")
    .WithSortKey("categoryName")
    .WithGroupKey("categoryGroup"));

// Grouped multi-select - fixed/enum options
public enum ProductTypeGrouped
{
    [SelectOptionGroup("Consumables")]
    Food = 0,
    [SelectOptionGroup("Consumables")]
    Drink = 1,
    [SelectOptionGroup("Goods")]
    Book = 2,
    [SelectOptionGroup("Goods")]
    Car = 3,
}

builder.MultiSelectFormControl(x => x.Type)
    .WithOptions(options => options.WithFixedValues<ProductTypeGrouped>()
    .WithSortKey("displayName")
    .WithGroupKey("group"));

// Grouped autocomplete - dynamic options
builder.AutocompleteFormControl(x => x.CategoryId)
    .WithOptions(options => options.WithDynamicValues()
    .WithValueKey("id")
    .WithDisplayKey("categoryName")
    .WithSortKey("categoryName")
    .WithGroupKey("categoryGroup"));
```