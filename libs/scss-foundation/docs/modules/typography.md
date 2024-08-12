# Typography method

Utilities for setting font properties for elements.

## Fonts

@use scss-foundation/src/modules/typography/fonts;

### Set fonts

Mixin for easily applying font properties such as family, size, and weight to an element. This mixin offers flexibility by allowing customization of each property, with optional arguments for family, size, and weight.

```
@include fonts.define-font('Roboto', 18px, 700);
```

Sets the font family, size, and weight properties.

```
font-family: 'Roboto';
font-size: 18px;
font-weight: 700;
```

If you only want to set certain properties, you can skip others by using named arguments:

```
@include fonts.define-font($size: 30px, $weight: bold);
```