# Breakpoints methods

Utilities related with application's breakpoints.

## Breakpoints

This module has overridable breakpoints variable. Due to Sass limitations, there should be only one (wrapper) @use/@forward of this utility in your application in order to prevent side effects and to have easier work.
Breakpoints must be in the same format as variables inside src root folder.

Usage:
@use scss-foundation/src/responsiveness/breakpoints;

- Applies desired styles and properties starting from certain breakpoint given by its key. Key must be valid key from given (or default) breakpoint collection.
```
@include breakpoints.apply-on($given-size);
```

- Sets up breakpoints in a way so you can pass them to the JS from HTML. This is needed so you could have them defined only in SCSS after which you can apply some logic in JS based on that, but with only one spot for future maintenance.
```
@include breakpoints.set-up($with-capitalization);
```
Mixin defines set of properties that must be added to a certain HTML container, ideally the root one. Whatever the width of display device is, content property of it is gonna hold descriptive name for it and you can process that kind of enum insided JS and apply some logic.
$with-capitalization argument is optional (default = true), since we're mostly using TypeScript + Angular Material which enforces capitalization.
