using System.Reflection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.KernelMemory;

var azureAISearchConfig = new AzureAISearchConfig();
var azureOpenAIEmbeddingConfig = new AzureOpenAIConfig();
var azureOpenAITextConfig = new AzureOpenAIConfig();

var configuration = new ConfigurationBuilder()
    .AddJsonFile("appsettings.json")
    .AddEnvironmentVariables()
    .AddUserSecrets(Assembly.GetExecutingAssembly())
    .Build()
    .BindSection("AzureAISearch", azureAISearchConfig)
    .BindSection("AzureOpenAIEmbedding", azureOpenAIEmbeddingConfig)
    .BindSection("AzureOpenAIText", azureOpenAITextConfig);

var kernelMemory = new KernelMemoryBuilder()
    .WithAzureOpenAITextEmbeddingGeneration(azureOpenAIEmbeddingConfig)
    .WithAzureOpenAITextGeneration(azureOpenAITextConfig)
    .WithAzureAISearchMemoryDb(azureAISearchConfig)
    .Configure(builder => builder.Services.AddLogging(l => l.SetMinimumLevel(LogLevel.Debug)))
    .Build<MemoryServerless>();

Console.WriteLine("Generating embeddings...");

var indexName = configuration.GetValue<string>("AzureAISearch:IndexName");

await kernelMemory.DeleteIndexAsync(indexName);

await kernelMemory.ImportDocumentAsync("Getting started with Entry.md", "getting-started-with-entry.md", index: indexName);

var documentUrls = configuration.GetSection("DocumentsToEmbed").Get<string[]>() ?? [];

foreach (var docUrl in documentUrls)
{
    var documentId = docUrl
        .Substring(docUrl.IndexOf("entry-components", StringComparison.OrdinalIgnoreCase))
        .Replace("/", "-", StringComparison.OrdinalIgnoreCase);

    Console.WriteLine($"Uploading document {docUrl}");
    await kernelMemory.ImportWebPageAsync(docUrl, index: indexName, documentId: documentId);
}

Console.WriteLine("Completed. Search index is updated.");
Console.ReadLine();


