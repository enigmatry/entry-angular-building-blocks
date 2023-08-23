# Background hover method

Hover utilities for easy definition of regular and hover background states.

## Background hover

@use scss-foundation/src/modules/states/hover;

- Background hover. Method for setting the background color of any element for the regular state, and when the element is hovered over, it changes the color to the specified hover state.

```
@include hover.background-hover($regular-state, $hover-state);
```
Sets the properties for both regular and hover states:
```
	background-color: $regular-state;
    background-color: $hover-state;
```
