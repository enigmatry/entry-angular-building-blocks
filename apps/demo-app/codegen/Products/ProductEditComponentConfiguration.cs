using Enigmatry.Entry.CodeGeneration.Configuration;
using Enigmatry.Entry.CodeGeneration.Configuration.Form;

namespace Enigmatry.Entry.DemoApp.CodeGeneration.Setup.Products;

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

        builder.DatepickerFormControl(x => x.ExpiresOn);

        builder.CheckboxFormControl(x => x.FreeShipping)
            .WithDefaultValue(true);
    }
}
