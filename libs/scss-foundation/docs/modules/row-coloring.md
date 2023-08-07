# Row coloring methods

Row coloring utilities for background color to rows based on their position.

## Row coloring

@use scss-foundation/src/modules/lists/row-coloring as list;

- Odd row coloring. Method for easily apply specified background color to odd-numbered rows.

```
@include list.odd-row-coloring($color);
```
Sets following property:
```
	background-color: $color;
```

- Even row coloring. Method for easily apply specified background color to even-numbered rows.

```
@include list.even-row-coloring($color);
```
Sets the same property as in previous method.