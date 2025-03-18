import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import pluginPromise from "eslint-plugin-promise";
import stylistic from "@stylistic/eslint-plugin";
import noSecrets from "eslint-plugin-no-secrets";
import importPlugin from "eslint-plugin-import";
import nounsanitized from "eslint-plugin-no-unsanitized";
import unusedImports from "eslint-plugin-unused-imports";
import arrowFunctions from "eslint-plugin-prefer-arrow-functions";

export default tseslint.config(
  ...angular.configs.tsRecommended,
  {
    ignores: ["src/**/generated/", "src/polyfills.ts", "src/@enigmatry/**", "**/api-reference.ts"]
  },
  {
    "processor": angular.processInlineTemplates,
    "files": ["src/**/*.ts"],
    "languageOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "parser": tseslint.parser,
      "parserOptions": {
        "projectService": true,
        "tsconfigRootDir": import.meta.dirname
      },
    },
    "plugins": {
      "no-unsanitized": nounsanitized,
      "@stylistic": stylistic,
      "@typescript-eslint": tseslint.plugin,
      "import": importPlugin,
      "no-secrets": noSecrets,
      "prefer-arrow-functions": arrowFunctions,
      "promise": pluginPromise,
      "unused-imports": unusedImports,
    },
    "rules": {
      "@angular-eslint/component-selector": [
        "error",
        {
          "prefix": [
            "app",
            "appg",
            "enigmatry",
            "entry"
          ],
          "style": "kebab-case",
          "type": "element"
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          "prefix": [
            "app",
            "appg",
            "enigmatry",
            "entry"
          ],
          "style": "camelCase",
          "type": "attribute"
        }
      ],
      "@stylistic/array-bracket-newline": "off",
      "@stylistic/array-bracket-spacing": [
        "error",
        "never"
      ],
      "@stylistic/array-element-newline": "off",
      "@stylistic/arrow-parens": [
        "error",
        "as-needed",
        {
          "requireForBlockBody": false
        }
      ],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/brace-style": "error",
      "@stylistic/comma-dangle": [
        "error",
        "never"
      ],
      "@stylistic/comma-spacing": "error",
      "@stylistic/comma-style": "error",
      "@stylistic/computed-property-spacing": "error",
      "@stylistic/curly-newline": "off",
      "@stylistic/dot-location": [
        "error",
        "property"
      ],
      "@stylistic/eol-last": "off",
      "@stylistic/function-call-argument-newline": "off",
      "@stylistic/function-call-spacing": "error",
      "@stylistic/function-paren-newline": "off",
      "@stylistic/generator-star-spacing": "error",
      "@stylistic/implicit-arrow-linebreak": "off",
      "@stylistic/indent": [
        "off",
        "tab"
      ],
      "@stylistic/indent-binary-ops": "off",
      "@stylistic/jsx-quotes": "error",
      "@stylistic/key-spacing": "error",
      "@stylistic/keyword-spacing": "off",
      "@stylistic/line-comment-position": "off",
      "@stylistic/linebreak-style": "off",
      "@stylistic/lines-around-comment": "off",
      "@stylistic/lines-between-class-members": [
        "off",
        "always",
        {
          "exceptAfterSingleLine": true
        }
      ],
      "@stylistic/max-len": [
        "error",
        {
          "code": 150,
          "ignoreComments": true
        }
      ],
      "@stylistic/max-statements-per-line": "error",
      "@stylistic/member-delimiter-style": [
        "error"
      ],
      "@stylistic/multiline-comment-style": "off",
      "@stylistic/multiline-ternary": "off",
      "@stylistic/new-parens": "error",
      "@stylistic/newline-per-chained-call": [
        "error",
        {
          "ignoreChainWithDepth": 2
        }
      ],
      "@stylistic/no-confusing-arrow": "off",
      "@stylistic/no-extra-parens": [
        "error"
      ],
      "@stylistic/no-extra-semi": [
        "error"
      ],
      "@stylistic/no-floating-decimal": "off",
      "@stylistic/no-mixed-operators": "off",
      "@stylistic/no-mixed-spaces-and-tabs": "off",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": "error",
      "@stylistic/no-tabs": "off",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": [
        "error",
        "below"
      ],
      "@stylistic/object-curly-newline": "off",
      "@stylistic/object-curly-spacing": [
        "error",
        "always"
      ],
      "@stylistic/object-property-newline": [
        "error",
        {
          "allowAllPropertiesOnSameLine": true
        }
      ],
      "@stylistic/one-var-declaration-per-line": "off",
      "@stylistic/operator-linebreak": "off",
      "@stylistic/padded-blocks": [
        "error",
        "never"
      ],
      "@stylistic/padding-line-between-statements": "off",
      "@stylistic/quote-props": [
        "error",
        "as-needed"
      ],
      "@stylistic/quotes": [
        "error",
        "single",
        {
          "allowTemplateLiterals": true
        }
      ],
      "@stylistic/rest-spread-spacing": [
        "error",
        "never"
      ],
      "@stylistic/semi": "error",
      "@stylistic/semi-spacing": "error",
      "@stylistic/semi-style": "off",
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        "never"
      ],
      "@stylistic/space-in-parens": "error",
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/spaced-comment": "off",
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": "error",
      "@stylistic/template-tag-spacing": "error",
      "@stylistic/type-annotation-spacing": [
        "error",
        {
          "after": true,
          "before": false,
          "overrides": {
            "arrow": {
              "after": true,
              "before": true
            },
            "colon": {
              "after": true,
              "before": false
            }
          }
        }
      ],
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/type-named-tuple-spacing": "error",
      "@stylistic/wrap-iife": "off",
      "@stylistic/wrap-regex": "off",
      "@stylistic/yield-star-spacing": "error",
      "@typescript-eslint/ban-ts-comments": "off",
      "@typescript-eslint/consistent-type-definitions": "error",
      "@typescript-eslint/consistent-type-exports": [
        "error",
        {
          "fixMixedExportsWithInlineTypeSpecifier": true
        }
      ],
      "@typescript-eslint/consistent-type-imports": [
        "off"
      ],
      "@typescript-eslint/default-param-last": [
        "error"
      ],
      "@typescript-eslint/dot-notation": [
        "error"
      ],
      "@typescript-eslint/indent": [
        "off",
        "tab"
      ],
      "@typescript-eslint/init-declarations": [
        "off"
      ],
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-array-constructor": [
        "error"
      ],
      "@typescript-eslint/no-array-delete": "error",
      "@typescript-eslint/no-deprecated": "error",
      "@typescript-eslint/no-dupe-class-members": [
        "error"
      ],
      "@typescript-eslint/no-empty-function": [
        "error"
      ],
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-implied-eval": [
        "error"
      ],
      "@typescript-eslint/no-import-type-side-effects": "error",
      "@typescript-eslint/no-invalid-this": [
        "error"
      ],
      "@typescript-eslint/no-loop-func": [
        "error"
      ],
      "@typescript-eslint/no-loss-of-precision": [
        "error"
      ],
      "@typescript-eslint/no-magic-numbers": [
        "error",
        {
          "enforceConst": true,
          "ignore": [
            0,
            1
          ],
          "ignoreArrayIndexes": true,
          "ignoreClassFieldInitialValues": true,
          "ignoreDefaultValues": true,
          "ignoreEnums": true,
          "ignoreNumericLiteralTypes": true,
          "ignoreReadonlyClassProperties": true,
          "ignoreTypeIndexes": true
        }
      ],
      "@typescript-eslint/no-meaningless-void-operator": [
        "error",
        {
          "checkNever": false
        }
      ],
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-redeclare": [
        "error"
      ],
      "@typescript-eslint/no-redundant-type-constituents": [
        "error"
      ],
      "@typescript-eslint/no-restricted-imports": [
        "off"
      ],
      "@typescript-eslint/no-restricted-types": "error",
      "@typescript-eslint/no-shadow": [
        "error"
      ],
      "@typescript-eslint/no-unnecessary-parameter-property-assignment": "error",
      "@typescript-eslint/no-unnecessary-template-expression": "error",
      "@typescript-eslint/no-unsafe-declaration-merging": [
        "error"
      ],
      "@typescript-eslint/no-unsafe-enum-comparison": "error",
      "@typescript-eslint/no-unsafe-function-type": "error",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/no-unsafe-unary-minus": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error"
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_"
        }
      ],
      "@typescript-eslint/no-use-before-define": [
        "error"
      ],
      "@typescript-eslint/no-useless-constructor": [
        "error"
      ],
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/parameter-properties": "off",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-promise-reject-errors": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/prefer-readonly-parameter-types": "off",
      "@typescript-eslint/related-getter-setter-pairs": "error",
      "@typescript-eslint/require-await": [
        "error"
      ],
      "@typescript-eslint/restrict-plus-operands": "error",
      "@typescript-eslint/return-await": [
        "error"
      ],
      "@typescript-eslint/use-unknown-in-catch-callback-variable": "off",
      "array-callback-return": "error",
      "arrow-body-style": "off",
      "block-scoped-var": "error",
      "camelcase": "warn",
      "capitalized-comments": "off",
      "class-methods-use-this": "off",
      "complexity": "error",
      "consistent-return": "error",
      "consistent-this": "error",
      "constructor-super": "error",
      "curly": "error",
      "default-case": "warn",
      "default-case-last": "error",
      "default-param-last": "off",
      "dot-notation": "off",
      "eqeqeq": "error",
      "for-direction": "error",
      "func-name-matching": "off",
      "func-names": "error",
      "func-style": "error",
      "function-call-argument-newline": "off",
      "getter-return": "error",
      "grouped-accessor-pairs": "warn",
      "guard-for-in": "warn",
      "id-denylist": "off",
      "id-length": [
        "error",
        {
          "max": 50,
          "min": 1
        }
      ],
      "id-match": "off",
      "import/consistent-type-specifier-style": [
        "off"
      ],
      "import/default": [
        "error"
      ],
      "import/dynamic-import-chunkname": [
        "off"
      ],
      "import/export": [
        "error"
      ],
      "import/exports-last": [
        "off"
      ],
      "import/extensions": [
        "off",
        "never"
      ],
      "import/first": [
        "error"
      ],
      "import/max-dependencies": [
        "error",
        {
          "ignoreTypeImports": false,
          "max": 20
        }
      ],
      "import/named": [
        "off"
      ],
      "import/namespace": [
        "error"
      ],
      "import/newline-after-import": [
        "error"
      ],
      "import/no-absolute-path": [
        "off"
      ],
      "import/no-amd": [
        "error"
      ],
      "import/no-anonymous-default-export": [
        "error"
      ],
      "import/no-commonjs": [
        "error"
      ],
      "import/no-cycle": [
        "error"
      ],
      "import/no-default-export": [
        "off"
      ],
      "import/no-deprecated": [
        "error"
      ],
      "import/no-duplicates": [
        "error"
      ],
      "import/no-dynamic-require": [
        "off"
      ],
      "import/no-empty-named-blocks": [
        "error"
      ],
      "import/no-extraneous-dependencies": [
        "error"
      ],
      "import/no-import-module-exports": [
        "error"
      ],
      "import/no-internal-modules": [
        "off"
      ],
      "import/no-mutable-exports": [
        "error"
      ],
      "import/no-named-as-default": [
        "error"
      ],
      "import/no-named-as-default-member": [
        "error"
      ],
      "import/no-named-default": [
        "error"
      ],
      "import/no-named-export": [
        "off"
      ],
      "import/no-namespace": [
        "off"
      ],
      "import/no-nodejs-modules": [
        "off"
      ],
      "import/no-relative-packages": [
        "off"
      ],
      "import/no-relative-parent-imports": [
        "off"
      ],
      "import/no-restricted-paths": [
        "off"
      ],
      "import/no-self-import": [
        "error"
      ],
      "import/no-unassigned-import": [
        "off"
      ],
      "import/no-unresolved": [
        "off"
      ],
      "import/no-unused-modules": [
        "off"
      ],
      "import/no-useless-path-segments": [
        "error"
      ],
      "import/no-webpack-loader-syntax": [
        "error"
      ],
      "import/order": [
        "error",
        {
          "alphabetize": {
            "caseInsensitive": true,
            "order": "asc"
          }
        }
      ],
      "import/prefer-default-export": [
        "off"
      ],
      "import/unambiguous": [
        "error"
      ],
      "init-declarations": "off",
      "max-classes-per-file": [
        "error",
        1
      ],
      "max-depth": [
        "error",
        3
      ],
      "max-lines": [
        "error",
        150
      ],
      "max-lines-per-function": [
        "error",
        40
      ],
      "max-nested-callbacks": [
        "error",
        3
      ],
      "max-params": [
        "error",
        8
      ],
      "max-statements": [
        "error",
        20
      ],
      "new-cap": "off",
      "no-alert": "error",
      "no-array-constructor": "off",
      "no-async-promise-executor": "error",
      "no-await-in-loop": "error",
      "no-bitwise": "error",
      "no-caller": "error",
      "no-case-declarations": "error",
      "no-class-assign": "error",
      "no-compare-neg-zero": "error",
      "no-cond-assign": "error",
      "no-console": "error",
      "no-const-assign": "error",
      "no-constant-condition": "error",
      "no-constructor-return": "error",
      "no-continue": "off",
      "no-control-regex": "error",
      "no-debugger": "error",
      "no-delete-var": "error",
      "no-div-regex": "error",
      "no-dupe-args": "error",
      "no-dupe-class-members": "off",
      "no-dupe-else-if": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-else-return": "error",
      "no-empty": "off",
      "no-empty-character-class": "error",
      "no-empty-function": "off",
      "no-empty-pattern": "warn",
      "no-empty-static-block": "off",
      "no-eq-null": "error",
      "no-eval": "error",
      "no-ex-assign": "error",
      "no-extend-native": "error",
      "no-extra-bind": "error",
      "no-extra-boolean-cast": [
        "error",
        {
          "enforceForInnerExpressions": true
        }
      ],
      "no-extra-label": "error",
      "no-fallthrough": "error",
      "no-func-assign": "error",
      "no-global-assign": "error",
      "no-implicit-coercion": "off",
      "no-implicit-globals": "error",
      "no-implied-eval": "off",
      "no-import-assign": "error",
      "no-inner-declarations": "error",
      "no-invalid-regexp": "error",
      "no-invalid-this": "off",
      "no-irregular-whitespace": "error",
      "no-iterator": "error",
      "no-label-var": "error",
      "no-labels": "error",
      "no-lone-blocks": "error",
      "no-lonely-if": "error",
      "no-loop-func": "off",
      "no-loss-of-precision": "off",
      "no-magic-numbers": "off",
      "no-misleading-character-class": "error",
      "no-multi-assign": "error",
      "no-multi-str": "warn",
      "no-negated-condition": "error",
      "no-nested-ternary": "off",
      "no-new": "off",
      "no-new-func": "error",
      "no-new-native-nonconstructor": "error",
      "no-new-wrappers": "error",
      "no-nonoctal-decimal-escape": "error",
      "no-obj-calls": "error",
      "no-object-constructor": "error",
      "no-octal": "error",
      "no-octal-escape": "error",
      "no-param-reassign": "error",
      "no-plusplus": "off",
      "no-promise-executor-return": "error",
      "no-proto": "error",
      "no-prototype-builtins": "error",
      "no-redeclare": "off",
      "no-regex-spaces": "error",
      "no-restricted-exports": "off",
      "no-restricted-globals": "off",
      "no-restricted-imports": "off",
      "no-restricted-properties": "off",
      "no-restricted-syntax": "off",
      "no-return-assign": "off",
      "no-return-await": "off",
      "no-script-url": "error",
      "no-secrets/no-secrets": [
        "error",
        {
          "ignoreContent": [
            "__zone_symbol__UNPATCHED_EVENTS"
          ]
        }
      ],
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-sequences": "error",
      "no-setter-return": "error",
      "no-shadow": "off",
      "no-shadow-restricted-names": "error",
      "no-sparse-arrays": "error",
      "no-template-curly-in-string": "error",
      "no-ternary": "off",
      "no-this-before-super": "error",
      "no-throw-literal": "off",
      "no-undef": "off",
      "no-undef-init": "error",
      "no-undefined": "off",
      "no-underscore-dangle": "off",
      "no-unexpected-multiline": "error",
      "no-unmodified-loop-condition": "error",
      "no-unneeded-ternary": "error",
      "no-unreachable": "error",
      "no-unreachable-loop": "error",
      "no-unsafe-finally": "error",
      "no-unsafe-negation": "error",
      "no-unsafe-optional-chaining": "error",
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",
      "no-unused-expressions": "off",
      "no-unused-labels": "error",
      "no-unused-private-class-members": "error",
      "no-unused-vars": "off",
      "no-use-before-define": "off",
      "no-useless-assignment": "error",
      "no-useless-backreference": "error",
      "no-useless-call": "error",
      "no-useless-catch": "error",
      "no-useless-computed-key": "error",
      "no-useless-concat": "error",
      "no-useless-constructor": "off",
      "no-useless-empty-export": "off",
      "no-useless-escape": "error",
      "no-useless-rename": "error",
      "no-useless-return": "error",
      "no-var": "error",
      "no-void": "error",
      "no-warning-comments": "warn",
      "no-with": "error",
      "object-shorthand": "error",
      "one-var": "off",
      "operator-assignment": "error",
      "prefer-arrow-callback": "error",
      "prefer-arrow-functions/prefer-arrow-functions": [
        "warn",
        {
          "allowNamedFunctions": false,
          "classPropertiesAllowed": true,
          "disallowPrototype": true,
          "returnStyle": "implicit",
          "singleReturnOnly": false
        }
      ],
      "prefer-const": "error",
      "prefer-destructuring": "off",
      "prefer-exponentiation-operator": "off",
      "prefer-named-capture-group": "off",
      "prefer-numeric-literals": "warn",
      "prefer-object-has-own": "off",
      "prefer-object-spread": "off",
      "prefer-promise-reject-errors": "off",
      "prefer-regex-literals": "off",
      "prefer-rest-params": "error",
      "prefer-spread": "error",
      "prefer-template": "error",
      "promise/always-return": "off",
      "promise/avoid-new": "warn",
      "promise/catch-or-return": [
        "error",
        {
          "allowThen": true,
          "terminationMethod": [
            "catch",
            "finally"
          ]
        }
      ],
      "promise/no-callback-in-promise": "off",
      "promise/no-multiple-resolved": "error",
      "promise/no-native": "off",
      "promise/no-nesting": "off",
      "promise/no-new-statics": "error",
      "promise/no-promise-in-callback": "off",
      "promise/no-return-in-finally": "warn",
      "promise/no-return-wrap": [
        "error",
        {
          "allowReject": true
        }
      ],
      "promise/param-names": "error",
      "promise/prefer-catch": "warn",
      "promise/valid-params": "warn",
      "radix": "error",
      "require-atomic-updates": "error",
      "require-await": "off",
      "require-unicode-regexp": "warn",
      "require-yield": "error",
      "sort-imports": "off",
      "sort-keys": "off",
      "sort-vars": "off",
      "strict": "off",
      "symbol-description": "error",
      "unicode-bom": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          "args": "after-used",
          "argsIgnorePattern": "^_",
          "vars": "all",
          "varsIgnorePattern": "^_"
        }
      ],
      "use-isnan": "error",
      "valid-typeof": "error",
      "vars-on-top": "off",
      "yoda": "warn"
    }
  },
  {
    "files": ["*.html"],
    "extends": [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {
      "@angular-eslint/template/no-negated-async": "off"
    }
  }
);
