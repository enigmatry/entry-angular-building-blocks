# Breakpoints methods

Utilities related to the application's breakpoints.

## Breakpoints

This module has an overridable breakpoints variable. Due to Sass limitations, there should be only one (wrapper) @use/@forward of this utility in your application in order to prevent side effects and to have easier work.
Breakpoints must be in the same format as variables inside the src root folder.

Usage:
@use scss-foundation/src/modules/responsiveness/breakpoints;

- Applies desired styles and properties starting from a certain breakpoint given by its key. The key must be a valid key from
the given (or default) breakpoint collection.

```
@include breakpoints.apply-on($given-size);
```

- Sets up breakpoints in a way so you can pass them to the JS from HTML. This is needed so you could have them defined
only in SCSS after which you can apply some logic in JS based on that, but with only one spot for future maintenance.

```
@include breakpoints.set-up($with-capitalization);
```
Mixin defines the set of properties that must be added to a certain HTML container, ideally the root one. Whatever the width of the display device is, the content property of it is gonna hold a descriptive name for it and you can process that kind of enum insided JS and apply some logic.
$with-capitalization argument is optional (default = true), since we're mostly using TypeScript + Angular Material which enforces capitalization.
