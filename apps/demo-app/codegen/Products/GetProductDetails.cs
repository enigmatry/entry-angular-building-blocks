namespace Enigmatry.Entry.DemoApp.CodeGeneration.Setup.Products;

public static class GetProductDetails
{
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
}
