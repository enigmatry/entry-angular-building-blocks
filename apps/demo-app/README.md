# How to document a new entry component?

## Create Angular structure

Create a standalone documentation component named after the new entry component (e.g. `features/dialog/dialog-documentation.component.ts`). It imports `DocumentationContentComponent`, `ExampleViewerComponent` and the example components it shows; there is no feature module.

Use `app-documentation-content` shared component to define Overview/API/Examples tabs (e.g. `features/dialog/dialog-documentation.component.html`). Don't forget to provide `componentDefinition` input parameter!

Update `features/route-segments.ts` with new route to the feature and add new entry to `features/component-definitions.ts`. Don't forget to add a `loadComponent` route to the new documentation component in `app.routes.ts`.

After angular structure is set, we can add content to the tabs (Overview/API/Examples).

## Overview tab

This tab should load component's `README.md` file. To enable that, relative path to the `README.md` (e.g. '/entry-components/dialog/README.md') should be provided as value of `readmePath` field in `COMPONENT_DEFINITIONS` list.

Regarding the content of component's `README.md` file, it should be short as possible and easy to understand. Some guidelines:

* Start with description of the component and some of it's core features.
* Add `Integration` section listing all dependencies that the component requires.
* If possible, present basic usage of the component or how it can be configured.

## Examples tab

Examples are documented with `example-viewer` shared component. We use it to present entry component logic and the code behind it.

All of the components containing working entry components examples should be placed in the `examples/` folder. This way, it will be possible for `example-viewer` to load their code in layout. Each example is a standalone component that imports what its template uses and provides its own configuration (e.g. `provideEntryButtonConfig`), so its code tab shows how to set it up. When several examples share their configuration, put it in an `*.providers.ts` file next to them, provide it from the documentation component and list it in `extraFiles` (e.g. `examples/date-time-picker/date-time-picker-example.providers.ts`). Convention is that the example components name ends with `-example` suffix.

Use example components in `example-viewer` like this:

```html
<app-example-viewer
    title="Alert dialog example"
    component="dialog\alert\alert-example.component">
    <app-alert-example />
</app-example-viewer>

```

`title` represent the example caption. `component` represents path to the example component relative to the `examples/` folder. `example-viewer` content should be working example component.

### Extra files

By default, `example-viewer` displays the `.ts` and `.html` files of the example component; `showScss` adds the `.scss` one. We can add extra files using the `extraFiles` input parameter, with paths relative to the `examples/` folder (see `features/dialog/dialog-documentation.component.html`).

### Generated form example

The Form page's "Form example with configuration" (`examples/form/form-example/`) renders a product-edit form produced by the Enigmatry code generator (`entry-codegen`). Its source of truth is the .NET class library in `apps/demo-app/codegen/`, which holds the C# model and the form configuration. Regenerate it from the repository root with:

```bash
npm run demo-app:codegen
```

The command builds that project and runs the generator (`dotnet dnx enigmatry.entry.codegeneration.tools`, which needs a .NET 10 SDK; `codegen/global.json` pins it) into `examples/form/form-example/products/generated/`. Running it twice changes nothing. The pull request build runs it too and fails if the committed files differ from its output.

* **The files in `generated/` are committed exactly as the generator emits them.** Never edit them by hand and never post-process them. If they do not build, fix what surrounds them (`src/app/api/api-reference.ts` stands in for the API client they import their model from; the root `tsconfig.json` maps `src/*` for their app-absolute imports) or fix the generator.
* The generator version is pinned once: `EntryCodeGenerationVersion` in `codegen/Enigmatry.Entry.DemoApp.CodeGeneration.Setup.csproj`. When a new generator ships (e.g. 22.x), change that one line, run `npm run demo-app:codegen`, and commit the output unchanged.

See `apps/demo-app/codegen/README.md` for details, including why the generated code uses an NgModule and `*ngIf` and what replaces them.

## API tab

This tab should load generated documentation of the components api.

To be able to have api documentation, exported features of the component (defined in component's `public-api.ts`) must be documented with comments (`/** */` or `//`) like in `libs/entry-components/dialog/entry-dialog.service.ts`.

Only exported, documented, public members are published: `private` and `protected` members are left out, as is anything without a documentation comment. The entry point must also be listed in `entryPoints` of the library's `typedoc.json` (e.g. `libs/entry-components/typedoc.json`).

The documentation is generated in markdown by the `typedoc` npm script into `src/assets/api/` and can be accessed in the browser under `assets/api/`. **The generated files are not committed** — the folder is gitignored:

* `npm start` runs `npm run typedoc` first (`prestart` hook), so the API tab is populated locally. Run `npm run typedoc` again to see documentation changes while `ng serve` is already running.
* `deploy-demo.yml` runs `npm run typedoc` before building the demo application, so the deployed site always documents the libraries as they are on `master`.
* If you build the demo application directly with `ng build @enigmatry/demo-app`, run `npm run typedoc` first, otherwise the API tab shows no documentation.

To be able to load generated documentation in Api tab, path to the component's generated page (e.g. `'assets/api/@enigmatry/entry-components/dialog/public-api.md'`) should be provided as value of `apiDocsPath` field in `COMPONENT_DEFINITIONS` list.
