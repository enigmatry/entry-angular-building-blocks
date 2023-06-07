# Visibility methods

Visibility utilities for control of element visibility based on different device states.

## Visibility

@use scss-foundation/src/modules/states/visibility;

- Show on mobile. Method for controlling the visibility of the element on mobile devices.

```
@include visibility.show-on-mobile($mobile-state: block);
```
Argument is optional and default to block. Sets following property:
```
	display: $mobile-state;
```

- Show on tablet. Method for controlling the visibility of the element on tablet devices.

```
@include visibility.show-on-tablet($tablet-state: block);
```
Argument is optional and default to block. Sets following property:
```
	display: $tablet-state;
```
