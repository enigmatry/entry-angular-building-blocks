# Absolute positioning methods

Alignment utilities for absolute positioning of content.

## Absolute

@use scss-foundation/src/modules/position/absolute;

- Replaces the several most common lines in absolute positioning with just one liner.
```
@include absolute.position($top, $right, $bottom, $left);
```
All arguments are optional and default to 0. Sets following properties:
```
	position: absolute;
	top: $top;
	right: $right;
	bottom: $bottom;
	left: $left;
```

- Replaces the several most common lines in absolute positioning for unset values with just one liner.
```
@include absolute.position-unset($top, $right, $bottom, $left);
```
All arguments are optional and default to unset. Sets the same properties as in previous method.
