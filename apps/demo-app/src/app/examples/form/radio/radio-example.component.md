
```csharp
public enum ProductType
{
    Food = 0,
    Drink = 1,
    Book = 2,
    Car = 3,
}

builder.RadioGroupFormControl(x => x.Type)
    .WithOptions(options => options.WithFixedValues<ProductType>());
```