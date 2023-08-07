# Visibility methods

Visibility utilities for control of element visibility based on different device states.

## Visibility

@use scss-foundation/src/modules/states/visibility;

- Show on mobile. Method for controlling the visibility of the element on mobile devices.

```
@include visibility.show-on-mobile($mobile-state: block);
```
The argument is optional and defaults to block. Sets the following property:
```
	display: $mobile-state;
```

- Show on the tablet. Method for controlling the visibility of the element on tablet devices.

```
@include visibility.show-on-tablet($tablet-state: block);
```
The argument is optional and defaults to block. Sets the following property:
```
	display: $tablet-state;
```
