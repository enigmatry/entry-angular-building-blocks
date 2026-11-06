Generated forms resolve named validators (`.WithValidators("UniqueName")`) through `ENTRY_ASYNC_VALIDATOR_RESOLVER`, and render `.WithFormat(...)` as the `entryFieldFormat` directive. This example provides the resolver at component level; the name `admin` is taken.

```csharp
builder.InputFormControl(x => x.Name)
  .WithValidators("UniqueName");

builder.InputFormControl(x => x.Price)
  .WithFormat(new CurrencyPropertyFormatter().WithCurrencyCode("EUR"));
```

Formatted fields show the formatted value when they are not focused and a plain number while editing; the form value stays a number. Both are reactive-forms bridges for generated forms and will be replaced when generated forms migrate to signal forms.
