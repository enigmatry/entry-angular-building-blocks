# How to document a new entry component?

## Create Angular structure

Create new feature module (with routing) and root component named as new entry component (e.g. `features/dialog`).

Use `app-documentation-content` shared component to define Overview/API/Examples tabs (e.g. `features/dialog/dialog.component.html`). Don't forget to provide `componentDefinition` input parameter!

Update `shared/models/route-segments.ts` with new route to the feature and add new entry to `shared/models/component-definitions.ts`. Don't forget to update `app-routing.module.ts` with routing to the new feature.

After angular structure is set, we can add content to the tabs (Overview/API/Examples).

## Overview tab

This tab should load component's `README.md` file. To enable that, relative path to the `README.md` (e.g. '/entry-components/dialog/README.md') should be provided as value of `readmePath` field in `COMPONENT_DEFINITIONS` list.

Regarding the content of component's `README.md` file, it should be short as possible and easy to understand. Some guidelines:

* Start with description of the component and some of it's core features.
* Add `Imports` section listing all dependencies that the component requires.
* If possible, present basic usage of the component or how it can be configured.

## Examples tab

Examples are documented with `example-viewer` shared component. We use it to present entry component logic and the code behind it.

All of the components containing working entry components examples should be placed in `Examples` module (`examples/`). This way, it will be possible for `example-viewer` to load their code in layout. Convention is that the example components name ends with `-example` suffix.

Use example components in `example-viewer` like this:

```html
<app-example-viewer
    title="Alert dialog example"
    path="dialog\alert\alert-example.component">
    <app-alert-example></app-alert-example>
</app-example-viewer>

```

`title` represent the example caption. `path` represents path to the example component relative to the `Examples` module. `example-viewer` content should be working example component.

### Extra files

By default, `example-viewer` displays 3 files (`.ts`, `.scss` and `.html`) of examples component. We can add extra files using `extraFileDefinitions` input parameter (e.g. `features/dialog/dialog.component.html`).

## API tab

This tab should load generated documentation of the components api.

To be able to have api documentation, exported features of the component (defined in component's `public-api.ts`) must be documented with comments (`/** */` or `//`) like in `projects/entry-components/dialog/entry-dialog.service.ts`.

After the component features are decorated with documentation comments use `typedoc` npm script to generate documentation. Documentation will be generated in `assets/api/` folder and can be accessed in browser using same path.

To be able to load generated documentation in Api tab, path to the component's generated page (e.g. 'assets/api/modules/Entry_Components.dialog_public_api.html') should be provided as value of `apiDocsPath` field in `COMPONENT_DEFINITIONS` list.
