---
name: scss-tests
description: Writing SCSS unit tests for libs/scss-foundation using sass-true and Jest. Use this when adding or reviewing SCSS mixins, functions, or utilities in libs/scss-foundation/src/modules.
---

# SCSS Tests — scss-foundation

You are writing SCSS unit tests for the `@enigmatry/scss-foundation` library. Tests use [sass-true](https://www.oddbird.net/true/) with Jest as the test runner.

---

## Setup and tooling

- **Framework**: `sass-true` v10 + `sass` (Dart Sass) + `jest`
- **Run all tests**: `cd libs/scss-foundation && npm run test`
- **Run from workspace root**: `npm run automated-tests` (also compiles themes)
- Jest collects all files matching `tests/**/*.tests.scss` via the shim in `shim.test.js`

---

## File conventions

| Rule | Detail |
|---|---|
| File naming | `<module-name>.tests.scss` — must end in `.tests.scss` |
| Location | `libs/scss-foundation/tests/<category>/` — mirror the `src/modules/<category>/` folder structure |
| One file per module | Each `src/modules/category/_module.scss` gets its own `tests/category/module.tests.scss` |

**Example mapping:**
```
src/modules/typography/fonts       →  tests/typography/fonts.tests.scss
src/modules/borders/border-radius  →  tests/borders/border-radius.tests.scss
src/modules/layout/grid            →  tests/layout/grid.tests.scss
```

---

## Import conventions

Always `@use` sass-true. Two forms exist in the codebase — prefer the first (alias form) for new tests, but be consistent within a file:

```scss
// Preferred (alias)
@use 'sass-true' as true;

// Also acceptable (named access)
@use 'sass-true/sass/true';
```

Import the module under test with a relative path from the test file to `src/`:

```scss
@use '../../src/modules/typography/fonts';
@use '../../src/modules/variables' as vars;
```

When the module uses a `$testing` guard (to suppress media queries or side-effecting output during tests), set it before any includes:

```scss
vars.$testing: true;
```

---

## Test structure

Tests follow a strict three-level nesting: `describe` → `it` → `assert`.

```scss
@include true.describe('mixin-or-function-name($param1, $param2)') {
  @include true.it('should describe expected behavior') {
    @include true.assert() {
      @include true.output() {
        // Call the mixin/function here
        @include my-module.my-mixin(arg1, arg2);
      }
      @include true.expect() {
        // Paste the exact CSS properties that should be emitted
        property: value;
      }
    }
  }
}
```

### Naming conventions
- `describe` label: the **mixin or function signature** — e.g., `'generate($spacing, $divisions)'`, `'partial-border-radius($top-left, $top-right, $bottom-right, $bottom-left)'`
- `it` label: plain English describing the specific scenario — e.g., `'should set font family and size'`, `'should throw if spacing is not a number'`

---

## Choosing the right assertion

### `expect` — exact match
Use when the mixin emits a known, deterministic set of CSS properties:

```scss
@include true.output() {
  @include border.partial-border-radius($top-right: 10px, $bottom-right: 1.2em);
}
@include true.expect() {
  border: {
    top-left-radius: 0;
    top-right-radius: 10px;
    bottom-right-radius: 1.2em;
    bottom-left-radius: 0;
  }
}
```

### `contains` — partial match
Use when the mixin emits error comments, or when the output also contains unrelated rules you don't want to assert on (e.g., responsive mixins that generate many classes):

```scss
@include true.output() {
  @include grid.generate('invalid');
}
@include true.contains() {
  /* ERROR [generate($spacing, $divisions)]: */
  /*   Please provide number parameter! Given value: invalid */
}
```

> **Rule of thumb**: use `expect` for normal/happy-path cases, `contains` for error paths and large output blocks.

---

## Testing error/guard behavior

Sass errors emitted via `@error` appear as CSS comments in the compiled output. Assert them with `contains`:

```scss
@include true.it('should throw if only one property is defined') {
  @include true.assert() {
    @include true.output() {
      @include fonts.define-font('Arial'); // only family, missing size or weight
    }
    @include true.contains() {
      /* ERROR [define-font($family, $size, $weight)]: */
      /*   At least two of the font properties must be provided. */
    }
  }
}
```

The error comment format follows the pattern the existing modules use:
```scss
/* ERROR [mixin-name($params)]: */
/*   Human-readable reason. */
```

---

## Testing optional parameters / named arguments

Test all meaningful combinations of optional parameters — defaults, named keyword arguments, and fully-specified calls:

```scss
// Default values only
@include true.it('should set border-radius with default values') {
  @include true.assert() {
    @include true.output() { @include border.partial-border-radius(); }
    @include true.expect() { border: { top-left-radius: 0; ... } }
  }
}

// Subset via named args
@include true.it('should set $top-right and $bottom-right') {
  @include true.assert() {
    @include true.output() { @include border.partial-border-radius($top-right: 10px, $bottom-right: 1.2em); }
    @include true.expect() { ... }
  }
}

// All positional args
@include true.it('should set all values') {
  @include true.assert() {
    @include true.output() { @include border.partial-border-radius(4px, 4px, 8px, 8px); }
    @include true.expect() { ... }
  }
}
```

---

## Testing hover / pseudo-states

When mixins emit nested selectors (e.g., `&:hover`), write them directly in `expect`:

```scss
@include true.output() {
  @include hover.background-hover(#FFF, #CCC);
}
@include true.expect() {
  background-color: #FFF;

  /* stylelint-disable-next-line nesting-selector-no-missing-scoping-root */
  &:hover, &:hover::before {
    background-color: #CCC;
  }
}
```

Add `/* stylelint-disable-next-line nesting-selector-no-missing-scoping-root */` before any nested `&` selector inside `expect` to suppress stylelint false positives.

---

## Suppressing stylelint in test files

Test files frequently need to suppress rules that are intentional in the context of assertions. Add file-level disables at the top when needed:

```scss
/* stylelint-disable scss/no-unused-private-members */
/* stylelint-disable scss/block-no-redundant-nesting */
/* stylelint-disable pitcher/max-lines, plugin/file-max-lines */
/* stylelint-disable shorthand-property-no-redundant-values */
/* stylelint-disable at-rule-allowed-list, number-max-precision */
```

Only disable what is actually needed for the file.

---

## Coverage checklist when writing tests for a new mixin

1. **Happy path with all arguments** — verify exact output
2. **Happy path with defaults only** — verify defaults are applied
3. **Happy path with named/keyword arguments** — verify partial overrides
4. **Error/guard paths** — verify error comments are emitted for invalid inputs
5. **Edge values** — zero, `null`, wrong type, out-of-range numbers (where the mixin guards against them)
