# Entry Toolbar

Can be used as a container for headers, titles, menus, logos, etc. It supports multi-slot content projections
where the main one (no selector required) projects provided elements in the central frame of the toolbar. If the elements have to be projected to the left or to the right side of the central content `left-side` or `right-side` content selectors can be used.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/toolbar';
```

## Basic usage

```html
<entry-toolbar>
    <img left-side src="assets/images/logo.png" />
    <span>Pretty application</span>
    <span right-side>
        <button mat-button color="primary">Sign out</button>
    </span>
</entry-toolbar>
```
