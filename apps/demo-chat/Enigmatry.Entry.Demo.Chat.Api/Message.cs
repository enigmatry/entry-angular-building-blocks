namespace Enigmatry.Entry.Demo.Chat.Api;

public record Message(string Role, string? Content)
{
    public IEnumerable<Source> Sources { get; set; } = [];
}

public record Source(string SourceName, string? SourceUrl);
