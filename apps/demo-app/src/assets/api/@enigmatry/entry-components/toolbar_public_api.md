[**toolbar/public-api**](toolbar_public_api.md)

---

# Module: toolbar/public-api

## Index

### Classes

- [EntryToolbarComponent](toolbar_public_api.md#entrytoolbarcomponent)

## Classes

### EntryToolbarComponent

Toolbar component (`<entry-toolbar>`) is used to render header section in the applications containing menu items as a content.
It offers build in support for toolbar title or logo, while other elements need to be provided via content projection.
On smaller screens (mobile/tablet) it switches to compact view containing menu icon button used to toggle content visibility.

#### Example

```html
<entry-toolbar
  titleUri="http://www.enigmatry.com"
  titleLogoSrc="assets/enigmatry-logo.png"
>
  <!-- SOME CUSTOM HTML CODE THAT RENDERS MENU ITEMS -->
</entry-toolbar>
```

#### Properties

| Property       | Type      | Description                                                            |
| :------------- | :-------- | :--------------------------------------------------------------------- |
| `hideTitle`    | `boolean` | Used to hide the title section if not required (default value false)   |
| `title`        | `string`  | Toolbar title positioned in the left side                              |
| `titleLogoSrc` | `string`  | If provided, it replaces string title and renders logo image instead   |
| `titleUri`     | `string`  | Url to be redirected to if user click on the title (default value '/') |
