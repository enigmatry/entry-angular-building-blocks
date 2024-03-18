Using custom nswag templates to fix date only parsing and formatting in generated api. Issues:

- DateOnly parameter in URL/querystring is serialized with time.

Template: `Client.RequestUrl.liquid` -> built in `formatDate` function used to format date as date only.

- DateOnly parameter in [FromForm] is serialized with time.

Template: `Client.RequestBody.liquid` -> built in `formatDate` function used to format date as date only.

- Date only format should be parsed as local date in generated api.

Template: `ConvertToClass.liquid` -> built in `parseDateOnly` function used to parse date only string as local date.


https://github.com/RicoSuter/NJsonSchema/issues/1480

https://github.com/RicoSuter/NSwag/issues/3958

https://github.com/RicoSuter/NSwag/issues/4295

Templates:

https://github.com/RicoSuter/NSwag/wiki/Templates

https://github.com/RicoSuter/NSwag/tree/master/src/NSwag.CodeGeneration.TypeScript/Templates

https://github.com/RicoSuter/NJsonSchema/tree/master/src/NJsonSchema.CodeGeneration.TypeScript/Templates