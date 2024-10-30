# Sizing methods

Utilities for setting various sizing properties for elements.

## Set sizes

@use scss-foundation/src/modules/sizes/set-size;

### Box dimensions

- Mixin for easily applying specified dimensions for width and height of an element and optional min/max constraints to shrink depending on the screen resizing.

```
@include set-size.box-dimensions(width, 100px, 50px, 200px);
```

Sets width property and their min and max values.

```
width: 100px;
min-width: 50px;
max-width: 200px;
```

### Box definition

- A comprehensive mixin for defining both the width and height properties of an element. Sets width and height along with optional min and max values for both dimensions, providing a flexible way to manage element sizing.

```
@include set-size.box-definition(300px, 200px, 250px, 350px, 150px, 250px);
```

Sets width and height along with their respective min and max values.

```
width: 300px;
min-width: 250px;
max-width: 350px;
height: 200px;
min-height: 150px;
max-height: 250px;
```
