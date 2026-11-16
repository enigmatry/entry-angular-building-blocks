# Demo app code generation setup

The Form page's "Form example with configuration" shows a product-edit form. That form is produced by the Enigmatry code generator ([`entry-codegen`](https://github.com/enigmatry/entry-code-generation)), and this .NET class library is its source of truth: it holds the C# model (`Products/GetProductDetails.cs`, `Products/ProductType.cs`) and the form configuration (`Products/ProductEditComponentConfiguration.cs`), the same way a consumer application's `*.CodeGeneration.Setup` project does.

## Regenerate

From the repository root (needs a .NET 10 SDK, which provides `dnx`; `global.json` in this folder pins it to 10.0.x):

```bash
npm run demo-app:codegen
```

It builds this project, deletes the previous output, and runs `dnx enigmatry.entry.codegeneration.tools@<version>` against the built assembly. The generator never deletes files itself, so clearing its output first is what keeps a file it no longer emits from surviving. The output lands in `apps/demo-app/src/app/examples/form/form-example/products/generated/` (the generator always writes to `<destination>/<feature>/generated/`, and the feature is `Products`).

Running it twice changes nothing: the output depends only on this configuration and the pinned generator version.

The pull request build (`azure-pipelines.yml`, "Gate: generated demo example is up to date") runs the same command and fails when the committed files differ from what it generates: a configuration or version change without its regenerated output, or a hand edit of the output.

## Rules

- **The generated files are committed exactly as the generator emits them.** Never edit them by hand and never post-process them. To change the form, change the configuration here and regenerate. If the output does not build, fix the demo app around it (for example `src/app/api/api-reference.ts`, the stand-in for the API client the generator imports its model from, or the `src/*` path in the root `tsconfig.json`) or fix the generator. Do not touch the output.
- The demo uses the generator's default Formly lane, without `--signals`, `--standalone-components` or `--enable-i18n`.
- `apps/demo-app/eslint.config.js` ignores `src/**/generated/**`, because the generated templates use `*ngIf`.

## Pinned version

The generator version is set once, by `EntryCodeGenerationVersion` in `Enigmatry.Entry.DemoApp.CodeGeneration.Setup.csproj`. It pins both the `Enigmatry.Entry.CodeGeneration.Configuration` package this project references and the `enigmatry.entry.codegeneration.tools` package the `Generate` target runs, because the two are always released together. The current version is 21.2.0.

The .NET SDK is pinned separately, by `global.json` in this folder (10.0.x, the runtime the 21.x generator targets). The npm script runs from this folder so that the pin applies, and the PR build's `UseDotNet@2` step reads the same file.

### When a new generator ships (e.g. 22.x)

Change `EntryCodeGenerationVersion` in the `.csproj`, run `npm run demo-app:codegen`, and commit the regenerated files as they come out. Review the diff of `generated/`: every change in it is a change in the generator's behaviour, and the build and the Form page show whether the demo app needs adjusting around it.
