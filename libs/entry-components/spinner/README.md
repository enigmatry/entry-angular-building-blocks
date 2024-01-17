# Entry spinner

Loading spinner that is intended to inform the user that an operation is in progress.

## Integration

Import component module in your shared module:

```ts
import { EntrySpinnerModule } from '@enigmatry/entry-components/spinner';
```

## Usage

Show spinner:

```html
<entry-spinner *ngIf="loading"></entry-spinner>
```

Show spinner positioned in the center of the screen and with background overlay: 

```html
<entry-spinner *ngIf="loading" [fullscreen]="true" [hasBackgroundOverlay]="true"></entry-spinner>
```


### Spinner inputs

- color: `ThemePalette ` *default* `primary`
  - 'primary' | 'accent' | 'warn'
- diameter: `number` *default* `30`
  - Diameter of the progress spinner (will set width and height of svg)
- fullscreen: `boolean` *default* `false`
  - Show spinner in full screen or relative to the container. 
- hasBackgroundOverlay: `boolean` *default* `true`
  - Show spinner with or without a background overlay.