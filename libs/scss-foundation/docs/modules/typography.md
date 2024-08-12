# Typography method

Utilities for setting font properties for elements.

## Fonts

@use scss-foundation/src/modules/typography/fonts;

### Set fonts
Mixin for easily applying font properties such as family, size, and weight to an element. This mixin offers flexibility by allowing customization of each property, with sensible defaults for size and weight.

```
@include set-fonts.set-font('Roboto', 18px, 700);
```

Sets the font family, size, and weight properties.

```
font-family: 'Roboto';
font-size: 18px;
font-weight: 700;
```