# Border-radius method

Border radius utility for setting different border radius values for each corner of an element.

## Border Radius

@use scss-foundation/src/modules/borders/border-radius;

- Replaces the several most common lines in border radius with just one liner.

```
@include border-radius.partial-border-radius($top-left, $top-right, $bottom-right, $bottom-left);
```
All arguments are optional and default to 0. Sets the following properties:
```
	top-left-radius: $top-left;
	top-right-radius: $top-right;
	bottom-right-radius: $bottom-right;
	bottom-left-radius: $bottom-left;
```