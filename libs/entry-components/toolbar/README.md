# Entry Toolbar

Container for the application header elements like menu items and titles. The elements are supplied to the toolbar component via content projection. Toolbar component is responsive, on smaller screens it switches to _mobile view_ with menu button icon.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/toolbar';
```

Styles import:

```css
@use '@enigmatry/entry-components/styles/generate' as entry;

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
