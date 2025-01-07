using System.ClientModel;
using Azure.AI.OpenAI;
using Enigmatry.Entry.Demo.Chat.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.AI;
using Microsoft.KernelMemory;

var builder = WebApplication.CreateBuilder(args);

var azureSearchConfig = new AzureAISearchConfig();
var azureOpenAiEmbeddingConfig = new AzureOpenAIConfig();
var azureOpenAiTextConfig = new AzureOpenAIConfig();

var searchIndex = builder.Configuration.GetValue<string>("AzureAISearch:IndexName");

builder.Configuration
    .BindSection("AzureAISearch", azureSearchConfig)
    .BindSection("AzureOpenAIEmbedding", azureOpenAiEmbeddingConfig)
    .BindSection("AzureOpenAIText", azureOpenAiTextConfig);

builder.Services.AddSingleton(
    new AzureOpenAIClient(
        new Uri(azureOpenAiTextConfig.Endpoint),
        new ApiKeyCredential(azureOpenAiTextConfig.APIKey)
    ));

builder.Services
    .AddChatClient(chat => chat.Services.GetRequiredService<AzureOpenAIClient>()
        .AsChatClient(azureOpenAiTextConfig.Deployment));

builder.Services.AddSingleton<IKernelMemory>(new KernelMemoryBuilder()
    .WithAzureOpenAITextEmbeddingGeneration(azureOpenAiEmbeddingConfig)
    .WithAzureOpenAITextGeneration(azureOpenAiTextConfig)
    .WithAzureAISearchMemoryDb(azureSearchConfig)
    .Build<MemoryServerless>());

builder.Services.AddCors();

var app = builder.Build();

app.MapPost("/chat", async ([FromServices] IChatClient client, [FromServices] IKernelMemory kernelMemory, [FromBody] Message[] messages) =>
{
    var userMessage = messages.LastOrDefault(m => m.Role == ChatRole.User.ToString());
    var question = userMessage?.Content ?? String.Empty;

    var searchResults = await kernelMemory.SearchAsync(question, searchIndex, limit: 4);

    var contexts = searchResults.Results.SelectMany(citation => citation.Partitions)
        .Select(partition => partition.Text)
        .ToList();

    var chatCompletion = await client.CompleteAsync(GetChatPrompt(question, contexts)); // return client.CompleteStreamingAsync(messages);

    return new Message(chatCompletion.Message.Role.ToString(), chatCompletion.Message.Text);
});

app.UseHttpsRedirection();

if (app.Environment.IsDevelopment())
{
    app.UseCors(policy => policy
        .WithOrigins("http://localhost:4200")
        .AllowCredentials()
        .AllowAnyMethod()
        .AllowAnyHeader());
}

app.Run();

static string GetChatPrompt(string query, IEnumerable<string> contexts)
{
    return $"""
            Using the following data sources as context

            ## Context
            {String.Join("\n", contexts)}

            ## Instruction

            Answer the user query: {query}
            
            """;
}
