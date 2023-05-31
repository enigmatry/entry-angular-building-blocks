# Entry Toolbar

Component used as container for other HTML elements. Usually, it should be used as application header containing logo and menu items. It supports horizontal and vertical orientation.

## Imports

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/toolbar';
```

## Basic usage

```html
<entry-toolbar src="assets/images/logo.png">
    <span>Pretty application</span>
    <span right-side>
        <button mat-button color="primary">Sign out</button>
    </span>
</entry-toolbar>
```
