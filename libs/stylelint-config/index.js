'use strict';
module.exports = {
  customSyntax: "postcss-scss",
  ignoreAtRules: ["else"],
  extends: "stylelint-config-property-sort-order-smacss",
  plugins: [
    "stylelint-scss",
    "@stylistic/stylelint-plugin",
    // "stylelint-use-nesting",     => uncomment this line once this library is again compatible with stylelint v16+
    //"stylelint-selector-no-empty",  => uncomment this line once this library is again compatible with stylelint v16+
    "stylelint-group-selectors",
    "stylelint-file-max-lines",
    "stylelint-declaration-block-no-ignored-properties"
  ],
  rules: {
    "@stylistic/at-rule-name-case": "lower",
    "@stylistic/at-rule-name-newline-after": null,
    "@stylistic/at-rule-name-space-after": "always",
    "@stylistic/at-rule-semicolon-newline-after": "always",
    "@stylistic/at-rule-semicolon-space-before": "never",
    "@stylistic/block-closing-brace-empty-line-before": "never",
    "@stylistic/block-closing-brace-newline-after": "always",
    "@stylistic/block-closing-brace-newline-before": "always",
    "@stylistic/block-closing-brace-space-after": null,
    "@stylistic/block-closing-brace-space-before": "always-single-line",
    "@stylistic/block-opening-brace-newline-after": "always",
    "@stylistic/block-opening-brace-newline-before": "never-single-line",
    "@stylistic/block-opening-brace-space-after": null,
    "@stylistic/block-opening-brace-space-before": "always",
    "@stylistic/color-hex-case": "upper",
    "@stylistic/declaration-bang-space-after": "never",
    "@stylistic/declaration-bang-space-before": "always",
    "@stylistic/declaration-block-semicolon-newline-after": "always",
    "@stylistic/declaration-block-semicolon-newline-before": "never-multi-line",
    "@stylistic/declaration-block-semicolon-space-after": null,
    "@stylistic/declaration-block-semicolon-space-before": "never",
    "@stylistic/declaration-block-trailing-semicolon": "always",
    "@stylistic/declaration-colon-newline-after": null,
    "@stylistic/declaration-colon-space-after": "always",
    "@stylistic/declaration-colon-space-before": "never",
    "@stylistic/function-comma-newline-after": "never-multi-line",
    "@stylistic/function-comma-newline-before": "never-multi-line",
    "@stylistic/function-comma-space-after": "always-single-line",
    "@stylistic/function-comma-space-before": "never",
    "@stylistic/function-max-empty-lines": 0,
    "@stylistic/function-parentheses-newline-inside": "never-multi-line",
    "@stylistic/function-parentheses-space-inside": "never",
    "@stylistic/function-whitespace-after": "always",
    "@stylistic/indentation": "tab",
    "@stylistic/linebreaks": null,
    "@stylistic/max-empty-lines": 1,
    "@stylistic/max-line-length": [
      135,
      { "ignore": ["comments"] }
    ],
    "@stylistic/media-feature-colon-space-after": "always",
    "@stylistic/media-feature-colon-space-before": "never",
    "@stylistic/media-feature-name-case": "lower",
    "@stylistic/media-feature-parentheses-space-inside": "never",
    "@stylistic/media-feature-range-operator-space-after": "always",
    "@stylistic/media-feature-range-operator-space-before": "always",
    "@stylistic/media-query-list-comma-newline-after": "never-multi-line",
    "@stylistic/media-query-list-comma-newline-before": "never-multi-line",
    "@stylistic/media-query-list-comma-space-after": "always",
    "@stylistic/media-query-list-comma-space-before": "never",
    "@stylistic/named-grid-areas-alignment": true,
    "@stylistic/no-empty-first-line": true,
    "@stylistic/no-eol-whitespace": [true, {
      ignore: ["empty-lines"]
    }],
    "@stylistic/no-extra-semicolons": true,
    "@stylistic/no-missing-end-of-source-newline": null,
    "@stylistic/number-leading-zero": "never",
    "@stylistic/number-no-trailing-zeros": true,
    "@stylistic/property-case": "lower",
    "@stylistic/selector-attribute-brackets-space-inside": "never",
    "@stylistic/selector-attribute-operator-space-after": "always",
    "@stylistic/selector-attribute-operator-space-before": "always",
    "@stylistic/selector-combinator-space-after": "always",
    "@stylistic/selector-combinator-space-before": "always",
    "@stylistic/selector-descendant-combinator-no-non-space": true,
    "@stylistic/selector-list-comma-space-after": "always",
    "@stylistic/selector-list-comma-space-before": "never",
    "@stylistic/selector-list-comma-newline-after": null,
    "@stylistic/selector-list-comma-newline-before": null,
    "@stylistic/selector-max-empty-lines": 0,
    "@stylistic/selector-pseudo-class-case": "lower",
    "@stylistic/selector-pseudo-class-parentheses-space-inside": "never",
    "@stylistic/selector-pseudo-element-case": "lower",
    "@stylistic/string-quotes": "single",
    "@stylistic/unit-case": "lower",
    "@stylistic/value-list-comma-newline-after": "never-multi-line",
    "@stylistic/value-list-comma-newline-before": "never-multi-line",
    "@stylistic/value-list-comma-space-after": "always-single-line",
    "@stylistic/value-list-comma-space-before": "never",
    "@stylistic/value-list-max-empty-lines": 0,
    "@stylistic/unicode-bom": null,
    "alpha-value-notation": "number",
    "annotation-no-unknown": [
      true,
      {
        "ignoreAnnotations": [
          "default"
        ]
      }
    ],
    "at-rule-allowed-list": ["use", "for", "if", "else", "include", "extend", "return", "error", "each", "mixin", "function", "keyframes", "font-face", "forward", "at-root", "while"],
    "at-rule-no-unknown": null,
    "block-no-empty": true,
    "comment-no-empty": true,
    "comment-whitespace-inside": "always",
    "color-function-notation": "modern",
    "color-hex-length": "short",
    "color-named": "never",
    "color-no-invalid-hex": true,
    "custom-property-empty-line-before": "always",
    "declaration-empty-line-before": "never",
    "declaration-block-no-duplicate-custom-properties": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-shorthand-property-overrides": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-single-line-max-declarations": 1,
    "declaration-no-important": true,
    "declaration-property-max-values": {},
    "declaration-property-value-no-unknown": null,
    "font-family-name-quotes": "always-unless-keyword",
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "font-weight-notation": "numeric",
    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "function-name-case": "lower",
    "function-no-unknown": null,
    "function-url-no-scheme-relative": true,
    "function-url-quotes": "always",
    "hue-degree-notation": "number",
    "import-notation": "string",
    "keyframe-block-no-duplicate-selectors": true,
    "keyframe-declaration-no-important": true,
    "length-zero-no-unit": true,
    "lightness-notation": "number",
    "max-nesting-depth": 3,
    "media-feature-name-allowed-list": ["min-width", "width", "-ms-high-contrast"],
    "media-feature-name-no-unknown": true,
    "media-feature-range-notation": "context",
    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-invalid-double-slash-comments": true,
    "no-unknown-animations": true,
    "no-unknown-custom-properties": null,
    "number-max-precision": 2,
    "property-no-unknown": true,
    "property-no-vendor-prefix": true,
    "rule-empty-line-before": [
      "always",
      { "except": ["after-single-line-comment", "first-nested"] }
    ],
    "selector-anb-no-unmatchable": true,
    "selector-attribute-quotes": "always",
    "selector-disallowed-list": null,
    "selector-max-attribute": 0,
    "selector-max-combinators": 2,
    "selector-max-compound-selectors": 3,
    "selector-max-id": 0,
    "selector-max-pseudo-class": 1,
    "selector-max-type": 2,
    "selector-max-universal": 0,
    "selector-no-qualifying-type": true,
    "selector-no-vendor-prefix": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-colon-notation": "double",
    "selector-pseudo-element-no-unknown": [
      true,
      { "ignorePseudoElements": ["host", "ng-deep"] }
    ],
    "selector-type-case": "lower",
    "selector-type-no-unknown": true,
    "shorthand-property-no-redundant-values": true,
    "string-no-newline": true,
    "time-min-milliseconds": 100,
    "unit-allowed-list": ["px", "%", "em", "rem", "vw", "deg", "ms", "s"],
    "unit-no-unknown": true,
    "value-keyword-case": "lower",
    "value-no-vendor-prefix": true,
    "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
    "scss/at-else-closing-brace-space-after": "never-intermediate",
    "scss/at-else-empty-line-before": "never",
    "scss/at-else-if-parentheses-space-before": "never",
    "scss/at-extend-no-missing-placeholder": true,
    "scss/at-function-parentheses-space-before": "never",
    "scss/at-function-named-arguments": [
      "never",
      { "ignoreFunctions": ["color.adjust"] }
    ],
    "scss/at-if-closing-brace-newline-after": null,
    "scss/at-if-closing-brace-space-after": null,
    "scss/at-if-no-null": true,
    "scss/at-import-partial-extension": "never",
    "scss/at-mixin-argumentless-call-parentheses": "always",
    "scss/at-mixin-parentheses-space-before": "never",
    "scss/at-root-no-redundant": true,
    "scss/at-rule-no-unknown": [
      true,
      { "ignoreAtRules": ["use"] }
    ],
    "scss/at-use-no-redundant-alias": true,
    "scss/block-no-redundant-nesting": true,
    "scss/dollar-variable-colon-space-after": "always",
    "scss/dollar-variable-colon-space-before": "never",
    "scss/double-slash-comment-whitespace-inside": "always",
    "scss/comment-no-empty": true,
    "scss/function-no-unknown": [
      true,
      { "ignoreFunctions": ["/^-/", "/^mat\\./", "/^theming\\.mat/"] }
    ],
    "scss/function-quote-no-quoted-strings-inside": true,
    "scss/function-calculation-no-interpolation": null,
    "scss/function-unquote-no-unquoted-strings-inside": true,
    "scss/load-no-partial-leading-underscore": true,
    "scss/operator-no-newline-after": true,
    "scss/operator-no-newline-before": true,
    "scss/operator-no-unspaced": true,
    "scss/partial-no-import": true,
    "scss/selector-no-redundant-nesting-selector": true,
    "scss/selector-no-union-class-name": true,
    "scss/no-duplicate-dollar-variables": [
      true,
      {
        "ignoreInsideAtRules": [
          "each",
          "while"
        ]
      }
    ],
    "scss/no-duplicate-mixins": true,
    "scss/no-global-function-names": true,
    "scss/no-unused-private-members": null,
    "plugin/declaration-block-no-ignored-properties": true,
    "plugin/stylelint-group-selectors": true,
    //"plugin/stylelint-selector-no-empty": true, => uncomment this line once this library is again compatible with stylelint v15+
    // "csstools/use-nesting": ["always", => uncomment this line once this library is again compatible with stylelint v16+
    //   { "syntax": "scss" }
    // ],
    "plugin/file-max-lines": 135
  }
};
