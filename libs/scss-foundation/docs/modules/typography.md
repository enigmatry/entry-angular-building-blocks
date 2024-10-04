# Typography method

Utilities for setting font properties for elements.

## Fonts

@use scss-foundation/src/modules/typography/fonts;

### Set fonts

The `define-font` mixin provides a simple way to apply font properties such as family, size, and weight to an element. It allows for flexibility by enabling customization of each property. It requires **at least two** of the font properties to be provided. If this condition is not met, an error will be thrown.

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