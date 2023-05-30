# Alignment methods

Alignment utilities for positioning items using flex.

## Items

@use scss-foundation/src/display/items;

- Center alignment. Wrapper method for following flex settings: flex direction row, justify content on flex start and align items centrally.
```
@include items.align-center();
```
- Configurable alignment. Everything is same as for the previous method, but align items property is configurable.
```
@include items.align($align);
```
- Horizontal and vertical central alignment. Wrapper method for following flex settings: flex direction row, justify content centrally and align items centrally.
```
@include items.align-absolute-center();
```
- Alignment utility. Replaces several line of CSS with just one liner. 
```
@include items.fully-align($align, $justify, $direction, $wrap);
```
Optional arguments and their default values:
$justify: flex-start, $direction: row, $wrap: wrap
Sets following properties:
```
	display: flex;
	flex: {
		direction: $direction;
		wrap: $wrap;
	};
	align-items: $align;
	justify-content: $justify;
```


