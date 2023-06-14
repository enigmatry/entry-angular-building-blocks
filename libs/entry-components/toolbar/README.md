# Entry Toolbar

Toolbar component (`<entry-toolbar>`) is used as a header section in the applications. It offers built-in support for title or logo on the left side, while other elements, like menu items, must be provided via content projection. The component is responsive in a way that on smaller screens (mobile/tablet) switches to _the compact view_ containing menu icon button used to toggle content visibility.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/toolbar';
```

Styles import:

```scss
@use 'entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

```html
<entry-toolbar
    title="Food & Drinks"
    titleUri="http://food-n-drinks.com">
    <ul>
        <li>Meals</li>
        <li>Order</li>
        <li>About</li>
    </ul>
</entry-toolbar>
```
