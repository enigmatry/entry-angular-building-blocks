# Background hover method

Hover utility for easily define the regular and hover states of background.

## Background hover

@use scss-foundation/src/states/hover;

- Background hover. Method for set the background color of any element for the regular state, and when the element is hovered over, it changes the color to the specified hover state.
```
@include hover.background-hover($regular-state, $hover-state);
```
Sets the properties for both regular and hover states:
```
	background-color: $regular-state;
    background-color: $hover-state;
```
