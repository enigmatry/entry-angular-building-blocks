# Demo app code generation setup

The Form page's "Form example with configuration" shows a product-edit form. That form is produced by the Enigmatry code generator ([`entry-codegen`](https://github.com/enigmatry/entry-code-generation)), and this .NET class library is its source of truth: it holds the C# model (`Products/GetProductDetails.cs`, `Products/ProductType.cs`) and the form configuration (`Products/ProductEditComponentConfiguration.cs`), the same way a consumer application's `*.CodeGeneration.Setup` project does.

## Regenerate

From the repository root (needs a .NET 10 SDK; `global.json` in this folder pins it to 10.0.x):

```bash
npm run demo-app:codegen
```

It builds this project, deletes all files under `form-example/*/generated/`, and runs `dotnet dnx enigmatry.entry.codegeneration.tools@<version>` against the built assembly. The generator never deletes files itself, so clearing its output first is what keeps a file it no longer emits from surviving. The output lands in `apps/demo-app/src/app/examples/form/form-example/products/generated/` (the generator always writes to `<destination>/<feature>/generated/`, and the feature is `Products`).

Running it twice changes nothing: the output depends only on this configuration and the pinned generator version.

The pull request build (`azure-pipelines.yml`, "Gate: generated demo example is up to date") runs the same command and fails when the committed files in any `form-example/*/generated/` folder differ from what it generates: a configuration or version change without its regenerated output, a new feature whose output was not committed, or a hand edit of the output.

## Rules

- **The generated files are committed exactly as the generator emits them.** Never edit them by hand and never post-process them. To change the form, change the configuration here and regenerate. If the output does not build, fix the demo app around it (for example `src/app/api/api-reference.ts`, the stand-in for the API client the generator imports its model from, or the `src/*` path in the root `tsconfig.json`) or fix the generator. Do not touch the output.
- The demo uses the generator's default Formly lane, without `--signals`, `--standalone-components` or `--enable-i18n`.
- `apps/demo-app/eslint.config.js` ignores `src/**/generated/**`, because the generated templates use `*ngIf`.

## Known limits of the 21.x output

The generated example does not follow the rules the rest of the demo app follows, and is not meant to: it shows what the pinned generator emits.

- **NgModule, `standalone: false`, decorator inputs, constructor injection.** The generator's Formly lane only emits module-declared components (`--standalone-components` merely adds a `StandaloneModule` import to the module). This works in the standalone, zoneless demo app: the Form page's Formly code stays module-based anyway (`examples/form/**` is exempt from `prefer-standalone`), and the form behaves the same as the hand-maintained copy it replaced.
- **`*ngIf` and `[ngIf]` in the template.** Deprecated since Angular 20, still shipped in Angular 22, so the output builds and runs; it would break only once Angular removes `NgIf`.
- **`// @ts-nocheck` and `/* eslint-disable */` at the top of every `.ts` file.** The generator writes them; type checking of the component class is therefore off, and the folder is excluded from ESLint.
- **Fixed import paths** (`src/app/shared/shared.module`, `src/app/api/api-reference`). Resolved by the root `tsconfig.json` `src/*` path and the stand-in in `src/app/api/`. A command-line option for the API model path is BP-1728.

Each changes with the generator, not with edits here. The generator's signals lane emits standalone components with `@if` and no NgModule, and BP-1664 makes it the default and deletes the Formly lane; once the demo adopts a generator release containing that change, the example is regenerated from this same configuration. That release does not remove the rest: the signals output still starts with the same `@ts-nocheck` and `eslint-disable` lines and still imports its model from `src/app/api/api-reference`, so keep the stand-in and the `src/*` path until BP-1728 makes that path configurable.

## Pinned version

The generator version is set once, by `EntryCodeGenerationVersion` in `Enigmatry.Entry.DemoApp.CodeGeneration.Setup.csproj`. It pins both the `Enigmatry.Entry.CodeGeneration.Configuration` package this project references and the `enigmatry.entry.codegeneration.tools` package the `Generate` target runs, because the two are always released together. The version is written only there; the documentation does not repeat it, so it cannot go stale at a bump.

The .NET SDK is pinned separately, by `global.json` in this folder (10.0.x, the runtime the pinned generator targets). The npm script runs from this folder so that the pin applies, and the PR build's `UseDotNet@2` step reads the same file. The `Generate` target calls `dotnet dnx` so that `global.json` selects the SDK; the `dnx` script in newer SDKs runs the newest installed SDK instead.

### When a new generator ships (e.g. 22.x)

Change `EntryCodeGenerationVersion` in the `.csproj`, run `npm run demo-app:codegen`, and commit the regenerated files as they come out. Review the diff of `generated/`: every change in it is a change in the generator's behaviour, and the build and the Form page show whether the demo app needs adjusting around it.
