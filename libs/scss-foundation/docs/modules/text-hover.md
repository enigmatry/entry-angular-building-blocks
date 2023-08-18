# Text hover method

Hover utilities for easy definition of regular and hover font states.

## Text Hover

@use scss-foundation/src/modules/text/hover;

- Font hover. Method for setting the color of the font for the regular state, and when the element is hovered over, it changes the color to the specified hover state.

```
@include hover.font-hover($regular-state, $hover-state);
```
Sets the properties for both regular and hover states:
```
	color: $regular-state;
    color: $hover-state;
```
