# Entry Button

Simple way of providing mat button type and color for material buttons that are used in other entry components e.g. dialog or form.

Allows projects to specify which type: flat, raised or basic, to use for a submit or cancel button.

## Integration

```npm
npm i @enigmatry/entry-components
```

Import component module:

```ts
import { EntryButtonModule } from '@enigmatry/entry-components/button';
```


## Basic usage

Provide configuration for submit or cancel button in feature or shared module.

```typescript
import { ENTRY_BUTTON_CONFIG, EntryButtonConfig, EntryButtonModule } from '@enigmatry/entry-components/button';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [{
    provide: ENTRY_BUTTON_CONFIG,
    useValue: new EntryButtonConfig({
      submit: { type: 'raised', color: 'primary' },
      cancel: { type: 'basic', }
    })
  }]
})
export class SharedModule { }
```

Apply the directive entry-submit-button or entry-cancel-button on a button instead of mat-flat-button or mat-raised-button.

```html
  <button mat-button entry-submit-button>Submit</button>
  <button mat-button entry-cancel-button>Cancel</button>
```