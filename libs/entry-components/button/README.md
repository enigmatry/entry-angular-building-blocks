# Entry Button

Simple way of providing mat button type and color for material buttons that are used in other entry components e.g. dialog or form.

Allows projects to specify which type: flat, raised or basic, to use for a submit or cancel button.

## Integration

```npm
npm i @enigmatry/entry-components
```

Import the standalone directive next to Material's button, in every component whose template uses `entry-submit-button` or `entry-cancel-button`:

```ts
import { MatButton } from '@angular/material/button';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';

@Component({
  imports: [MatButton, EntryButtonDirective],
  template: `<button mat-button entry-submit-button type="submit">Save</button>`
})
```

The directive is matched by attributes alone, so a template that forgets the import still compiles: the button renders as a plain `mat-button`, with no error. `EntryButtonModule` still exists for `NgModule`-based code and exports the same directive.


## Basic usage

Provide configuration for submit or cancel button in the application providers (or a route's, or an `NgModule`'s).

```typescript
import { provideEntryButtonConfig } from '@enigmatry/entry-components/button';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEntryButtonConfig({
      submit: { type: 'raised', color: 'primary' },
      cancel: { type: 'basic' }
    })
  ]
};
```

Apply the directive entry-submit-button or entry-cancel-button on a button instead of mat-flat-button or mat-raised-button.

```html
  <button mat-button entry-submit-button>Submit</button>
  <button mat-button entry-cancel-button>Cancel</button>
```