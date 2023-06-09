# Entry Header

Simple way of providing header layout and styling for the page or section header.

## Imports

```ts
import { EntryHeaderModule } from '@enigmatry/entry-components/entry-header';
```

Styles import:

```scss
@use 'entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

`entry-header` is used to provide standard layout and styles:

```html
<entry-header [title]="'Title here'">
    <div buttons>
        <button mat-raised-button color="primary">Add new</button>
        <button mat-raised-button color="accent">Other action</button>
    </div>
    <div content>
        Content goes here...
    </div>
</entry-header>
```

