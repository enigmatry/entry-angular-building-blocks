# How to document a new entry component?

## Create Angular structure

Create new feature module (with routing) and root component named as new entry component (e.g. `features/dialog`).

Use `app-documentation-content` shared component to define API/Examples tabs (e.g. `features/dialog/dialog.component.html`). Don't forget to provide `componentDefinition` input parameter!

Update `shared/models/route-segments.ts` with new route to the feature and add new entry to `shared/models/component-definitions.ts`. Don't forget to update `app-routing.module.ts` with routing to the new feature.

## Documenting API

TODO

## Documenting Examples

Examples are documented with `example-viewer` shared component. We use it to present entry component logic and the code behind it.

All of the components containing working entry components examples should be placed in `Examples` module (`examples/`). This way, it will be possible for `example-viewer` to load their code in layout. Convention is that the example components name ends with `-example` suffix.

Use example components in `example-viewer` like this:

```html
<app-example-viewer
    title="Alert dialog example"
    path="dialog\alert\alert-example.component">
    <div>
        <app-alert-dialog></app-alert-dialog>
    </div>
</app-example-viewer>

```

`title` represent the example caption. `path` represents path to the example component relative to the `Examples` module. `example-viewer` content should be working example component.

### Extra files

By default, `example-viewer` displays 3 files (`.ts`, `.scss` and `.html`) of examples component. We can add extra files using `extraFileDefinitions` input parameter (e.g. `features/dialog/dialog.component.html`).
