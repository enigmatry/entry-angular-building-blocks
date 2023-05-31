# Text hover method

Hover utility for easily define the regular and hover states of a font.

## Text Hover

@use scss-foundation/src/text/hover;

- Font hover. Method for set the color of the font for the regular state, and when the element is hovered over, it changes the color to the specified hover state.
```
@include hover.font-hover($regular-state, $hover-state);
```
Sets the properties for both regular and hover states:
```
	color: $regular-state;
    color: $hover-state;
```
