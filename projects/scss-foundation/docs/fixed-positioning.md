# Fixed positioning methods

Alignment utilities for fixed positioning of content.

## Fixed

@use scss-foundation/src/position/fixed;

- Replaces the several most common lines in fixed positioning with just one liner.
```
@include fixed.position($top, $right, $bottom, $left);
```
All arguments are optional and default to 0. Sets following properties:
```
	position: fixed;
	top: $top;
	right: $right;
	bottom: $bottom;
	left: $left;
```

- Replaces the several most common lines in fixed positioning for unset values with just one liner.
```
@include fixed.position-unset($top, $right, $bottom, $left);
```
All arguments are optional and default to unset. Sets the same properties as in previous method.
