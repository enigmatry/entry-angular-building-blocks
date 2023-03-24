'use strict';
module.exports = {
	root: true,
	env: {
		browser: true,
		jest: true,
		node: true
	},
	overrides: [
    {
      files: [ "*.ts" ],
      plugins: [ "@typescript-eslint", "@angular-eslint", "no-loops", "no-secrets", "no-unsanitized", "promise", "unused-imports", "xss", "deprecation" ],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: [
          "tsconfig.json",
          "e2e/tsconfig.json"
        ],
        createDefaultProgram: true
      },
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
	  rules: {
	    // The rules below are listed in the order they appear on the eslint
		// rules page. All rules are listed to make it easier to keep in sync
		// as new ESLint rules are added.
		// http://eslint.org/docs/rules/ 
        "for-direction": "error",
        "getter-return": "error",
        "no-async-promise-executor": "error",
        "no-await-in-loop": "error",
        "no-compare-neg-zero": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-constant-condition": "error",
        "no-control-regex": "error",
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-duplicate-case": "error",
        "no-empty": "off",
        "no-empty-character-class": "error",
        "no-ex-assign": "error",
        "no-extra-boolean-cast": "error",
        "no-extra-parens": "off",
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-import-assign": "error",
        "no-inner-declarations": "error",
        "no-invalid-regexp": "error",
        "no-irregular-whitespace": "error",
        "no-loss-of-precision": "off",
        "no-misleading-character-class": "error",
        "no-obj-calls": "error",
        "no-promise-executor-return": "error",
        "no-prototype-builtins": "error",
        "no-regex-spaces": "error",
        "no-setter-return": "error",
        "no-sparse-arrays": "error",
        "no-template-curly-in-string": "error",
        "no-unexpected-multiline": "error",
        "no-unreachable": "error",
        "no-unreachable-loop": "error",
        "no-unsafe-finally": "error",
        "no-unsafe-negation": "error",
        "no-unsafe-optional-chaining": "error",
        "no-useless-backreference": "error",
        "require-atomic-updates": "error",
        "use-isnan": "error",
        "valid-typeof": "error",
        "accessor-pairs": "error",
        "array-callback-return": "error",
        "block-scoped-var": "error",
        "class-methods-use-this": "off",
        "complexity": "error",
        "consistent-return": "error",
        "curly": "error",
        "default-case": "warn",
        "default-case-last": "error",
        "default-param-last": "off",
        "dot-location": [ "error", "property" ],
        "dot-notation": "off",
        "eqeqeq": "error",
        "grouped-accessor-pairs": "warn",
        "guard-for-in": "warn",
        "max-classes-per-file": [ "error", 1 ],
        "no-alert": "error",
        "no-caller": "error",
        "no-case-declarations": "error",
        "no-constructor-return": "error",
        "no-div-regex": "error",
        "no-else-return": "error",
        "no-empty-function": "off",
        "no-empty-pattern": "warn",
        "no-eq-null": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "no-extra-bind": "error",
        "no-extra-label": "error",
        "no-fallthrough": "error",
        "no-floating-decimal": "off",
        "no-global-assign": "error",
        "no-implicit-coercion": "off",
        "no-implicit-globals": "error",
        "no-implied-eval": "off",
        "no-invalid-this": "off",
        "no-iterator": "error",
        "no-labels": "error",
        "no-lone-blocks": "error",
        "no-loop-func": "off",
        "no-magic-numbers": "off",
        "no-multi-spaces": "error",
        "no-multi-str": "warn",
        "no-new": "off",
        "no-new-func": "error",
        "no-new-wrappers": "error",
        "no-nonoctal-decimal-escape": "error",
        "no-octal": "error",
        "no-octal-escape": "error",
        "no-param-reassign": "error",
        "no-proto": "error",
        "no-redeclare": "off",
        "no-restricted-properties": "off",
        "no-return-assign": "off",
        "no-return-await": "off",
        "no-script-url": "error",
        "no-self-assign": "error",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-throw-literal": "off",
        "no-unmodified-loop-condition": "error",
        "no-unused-expressions": "off",
        "no-unused-labels": "error",
        "no-useless-call": "error",
        "no-useless-catch": "error",
        "no-useless-concat": "error",
        "no-useless-escape": "error",
        "no-useless-return": "error",
        "no-void": "error",
        "no-warning-comments": "warn",
        "no-with": "error",
        "prefer-named-capture-group": "off",
        "prefer-promise-reject-errors": "off",
        "prefer-regex-literals": "off",
        "radix": "error",
        "require-await": "off",
        "require-unicode-regexp": "warn",
        "vars-on-top": "off",
        "wrap-iife": "off",
        "yoda": "warn",
        "strict": "off",
        "init-declarations": "off",
        "no-delete-var": "error",
        "no-label-var": "error",
        "no-restricted-globals": "off",
        "no-shadow": "off",
        "no-shadow-restricted-names": "error",
        "no-undef": "off",
        "no-undef-init": "error",
        "no-undefined": "off",
        "no-unused-vars": "off",
        "no-use-before-define": "off",
        "array-bracket-newline": "off",
        "array-bracket-spacing": [ "error", "never" ],
        "array-element-newline": "off",
        "block-spacing": "error",
        "brace-style": "off",
        "camelcase": "warn",
        "capitalized-comments": "error",
        "comma-dangle": "off",
        "comma-spacing": "off",
        "comma-style": "error",
        "computed-property-spacing": "error",
        "consistent-this": "error",
        "eol-last": "off",
        "func-call-spacing": "off",
        "func-name-matching": "off",
        "func-names": "error",
        "func-style": "error",
        "function-call-argument-newline": "off",
        "function-paren-newline": "off",
        "id-denylist": "off",
        "id-length": [
          "error",
          {
            "min": 1,
            "max": 50
          }
        ],
        "id-match": "off",
        "implicit-arrow-linebreak": "off",
        "indent": [ "off", "tab" ],
        "jsx-quotes": "error",
        "key-spacing": "error",
        "keyword-spacing": "off",
        "line-comment-position": "error",
        "linebreak-style": "off",
        "lines-around-comment": [
          "error",
          {
            "allowClassStart": true
          }
        ],
        "lines-between-class-members": [
          "off",
          "always",
          { "exceptAfterSingleLine": true }
        ],
        "max-depth": [ "error", 3 ],
        "max-len": [
          "error",
          {
            "code": 120,
            "ignoreComments": true
          }
        ],
        "max-lines": [ "error", 150 ],
        "max-lines-per-function": [ "error", 40 ],
        "max-nested-callbacks": [ "error", 3 ],
        "max-params": [ "error", 8 ],
        "max-statements": [ "error", 20 ],
        "max-statements-per-line": "error",
        "multiline-ternary": "off",
        "new-cap": "off",
        "new-parens": "error",
        "newline-per-chained-call": [
          "error",
          { "ignoreChainWithDepth": 2 }
        ],
        "no-array-constructor": "off",
        "no-bitwise": "error",
        "no-continue": "off",
        "no-lonely-if": "error",
        "no-mixed-operators": "off",
        "no-mixed-spaces-and-tabs": "off",
        "no-multi-assign": "error",
        "no-multiple-empty-lines": "error",
        "no-negated-condition": "error",
        "no-nested-ternary": "off",
        "no-new-object": "error",
        "no-plusplus": "off",
        "no-restricted-syntax": "off",
        "no-tabs": "off",
        "no-ternary": "off",
        "no-trailing-spaces": "error",
        "no-underscore-dangle": "off",
        "no-unneeded-ternary": "error",
        "no-whitespace-before-property": "error",
        "nonblock-statement-body-position": [ "error", "below" ],
        "object-curly-newline": "off",
        "object-curly-spacing": "off",
        "object-property-newline": [
          "error",
          { "allowAllPropertiesOnSameLine": true }
        ],
        "one-var": "off",
        "one-var-declaration-per-line": "off",
        "operator-assignment": "error",
        "operator-linebreak": "off",
        "padded-blocks": [ "error", "never" ],
        "padding-line-between-statements": "off",
        "prefer-exponentiation-operator": "off",
        "prefer-object-spread": "off",
        "quote-props": [ "error", "as-needed" ],
        "quotes": "off",
        "semi": "off",
        "semi-spacing": "error",
        "semi-style": "off",
        "sort-keys": "off",
        "sort-vars": "off",
        "space-before-blocks": "error",
        "space-before-function-paren": "off",
        "space-in-parens": "error",
        "space-infix-ops": "off",
        "space-unary-ops": "error",
        "spaced-comment": "error",
        "switch-colon-spacing": "error",
        "template-tag-spacing": "error",
        "unicode-bom": "off",
        "wrap-regex": "off",
        "arrow-body-style": [
          "error",
          "as-needed",
          { "requireReturnForObjectLiteral": true }
        ],
        "arrow-parens": [
          "error",
          "as-needed",
          { "requireForBlockBody": false }
        ],
        "arrow-spacing": "error",
        "constructor-super": "error",
        "generator-star-spacing": "error",
        "no-class-assign": "error",
        "no-confusing-arrow": "off",
        "no-const-assign": "error",
        "no-dupe-class-members": "off",
        "no-duplicate-imports": "off",
        "no-new-symbol": "error",
        "no-restricted-exports": "off",
        "no-restricted-imports": "off",
        "no-this-before-super": "error",
        "no-useless-computed-key": "error",
        "no-useless-constructor": "off",
        "no-useless-rename": "error",
        "no-var": "error",
        "object-shorthand": "error",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "prefer-destructuring": "off",
        "prefer-numeric-literals": "warn",
        "prefer-object-has-own": "off",
        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "require-yield": "error",
        "sort-imports": "off",
        "symbol-description": "error",
        "template-curly-spacing": "error",
        "yield-star-spacing": "error",
        "no-loops/no-loops": 2,
        "no-secrets/no-secrets": [
          "error",
          { "ignoreContent": [ "__zone_symbol__UNPATCHED_EVENTS" ] }
        ],
        "no-unsanitized/method": "error",
        "no-unsanitized/property": "error",
        "promise/always-return": "error",
        "promise/no-return-wrap": [
          "error",
          { "allowReject": true }
        ],
        "promise/param-names": "error",
        "promise/catch-or-return": [
          "error",
          {
            "allowThen": true,
            "terminationMethod": [ "catch", "finally" ]
          }
        ],
        "promise/no-native": "off",
        "promise/no-nesting": "off",
        "promise/no-promise-in-callback": "off",
        "promise/no-callback-in-promise": "off",
        "promise/avoid-new": "warn",
        "promise/no-new-statics": "error",
        "promise/no-return-in-finally": "warn",
        "promise/valid-params": "warn",
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          {
            "vars": "all",
            "varsIgnorePattern": "^_",
            "args": "after-used",
            "argsIgnorePattern": "^_"
          }
        ],
        "xss/no-mixed-html": [
          2,
          {
            "htmlVariableRules": [ "AsHtml", "HtmlEncoded/i", "^html$" ],
            "htmlFunctionRules": [ ".asHtml/i", "toHtml" ],
            "functions": {
              "$": {
                "htmlInput": true,
                "safe": [ "document", "this" ]
              },
              ".html": {
                "htmlInput": true,
                "htmlOutput": true
              },
              ".join": {
                "passthrough": {
                  "obj": true,
                  "args": true
                }
              }
            }
          }
        ],
        "xss/no-location-href-assign": [
          2,
          {
            "escapeFunc": "escapeHref"
          }
        ],
        "@typescript-eslint/brace-style": [ "error" ],
        "@typescript-eslint/comma-dangle": [ "error", "never" ],
        "@typescript-eslint/comma-spacing": [ "error" ],
        "@typescript-eslint/consistent-type-exports": [ 
          "error", 
          {
            "fixMixedExportsWithInlineTypeSpecifier": true
          }
        ],
        "@typescript-eslint/consistent-type-imports": [ "off" ],
        "@typescript-eslint/default-param-last": [ "error" ],
        "@typescript-eslint/dot-notation": [ "error" ],
        "@typescript-eslint/func-call-spacing": [ "error" ],
        "@typescript-eslint/indent": [ "off", "tab" ],
        "@typescript-eslint/init-declarations": [ "off" ],
        "@typescript-eslint/keyword-spacing": [ "error" ],
        "@typescript-eslint/lines-between-class-members": [
          "error",
          "always",
          { "exceptAfterSingleLine": true }
        ],
        "@typescript-eslint/no-array-constructor": [ "error" ],
        "@typescript-eslint/no-dupe-class-members": [ "error" ],
        "@typescript-eslint/no-duplicate-imports": [ "error" ],
        "@typescript-eslint/no-empty-function": [ "error" ],
        "@typescript-eslint/no-extra-parens": [ "error" ],
        "@typescript-eslint/no-extra-semi": [ "error" ],
        "@typescript-eslint/no-implied-eval": [ "error" ],
        "@typescript-eslint/no-invalid-this": [ "error" ],
        "@typescript-eslint/no-loop-func": [ "error" ],
        "@typescript-eslint/no-loss-of-precision": [ "error" ],
        "@typescript-eslint/no-magic-numbers": [
          "error",
          {
            "ignore": [ 0, 1 ],
            "ignoreArrayIndexes": true,
            "ignoreDefaultValues": true,
            "ignoreEnums": true,
            "ignoreReadonlyClassProperties": true,
            "enforceConst": true
          }
        ],
        "@typescript-eslint/no-meaningless-void-operator": [
          "error",
          {
            "checkNever": false
          }
        ],
        "@typescript-eslint/no-non-null-assertion": [ "error" ],
        "@typescript-eslint/no-redeclare": [ "error" ],
        "@typescript-eslint/no-restricted-imports": [ "off" ],
        "@typescript-eslint/no-shadow": [ "error" ],
        "@typescript-eslint/no-throw-literal": [ "error" ],
        "@typescript-eslint/no-unused-expressions": [ "error" ],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { "argsIgnorePattern": "^_" }
        ],
        "@typescript-eslint/no-use-before-define": [ "error" ],
        "@typescript-eslint/no-useless-constructor": [ "error" ],
        "@typescript-eslint/object-curly-spacing": [ "error", "always" ],
        "@typescript-eslint/quotes": [
          "error",
          "single",
          { "allowTemplateLiterals": true }
        ],
        "@typescript-eslint/require-await": [ "error" ],
        "@typescript-eslint/return-await": [ "error" ],
        "@typescript-eslint/semi": [ "error" ],
        "@typescript-eslint/space-before-function-paren": [ "error", "never" ],
        "@typescript-eslint/space-infix-ops": [ "error" ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": [ "app", "enigmatry", "appg" ],
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": [ "app", "enigmatry", "appg" ],
            "style": "camelCase"
          }
      ],
        "deprecation/deprecation": "error"
      }
	},
    {
      files: [ "*.html" ],
      extends: [ "plugin:@angular-eslint/template/recommended" ],
      parser: "@angular-eslint/template-parser",
      plugins: [ "@angular-eslint/template" ]
    }
  ]
};
