import defaultEnigmatryConfiguration from './libs/eslint-config/index.js';
import vitest from '@vitest/eslint-plugin';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        ignores: ['libs/scss-foundation/coverage/**']
    },
    {
        files: ['libs/**/*.ts'],
        rules: {
            '@angular-eslint/use-injectable-provided-in': 'off', // TODO BP-1642: 6 injectables (date/time adapters, event plugins, spinner overlay container) are provided where they are used (component providers, provideEntryNativeTimeAdapter, NG_EVENT_PLUGINS), not by providedIn
            '@typescript-eslint/no-unnecessary-condition': 'error',
            // The root tsconfig maps `apps/*` so entry-codegen's workspace-absolute imports resolve
            // inside apps/demo-app/**/generated/. Libraries inherit that mapping through `extends`,
            // so guard the lib -> app boundary here.
            'no-restricted-imports': ['error', {
                patterns: [{
                    group: ['apps/**'],
                    message: 'Libraries must not import from apps/**. The `apps/*` tsconfig path exists only for generated demo-app code.'
                }]
            }]
        }
    },
    {
        files: ['libs/entry-form/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off' // TODO BP-1647: 8 declarations in entry-form are still NgModule-declared; two of its modules still pull in Formly
        }
    },
    {
        // Vitest specs (`ng test`), with the rules EBO's applications use. Specs import `describe`, `it` and `expect`
        // from 'vitest' rather than relying on globals, so test types stay out of the library sources.
        files: ['libs/**/*.spec.ts'],
        plugins: { vitest },
        rules: {
            'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
            'vitest/expect-expect': ['error', { assertFunctionNames: ['expect'] }],
            'vitest/max-expects': ['error', { max: 4 }],
            'vitest/max-nested-describe': ['error', { max: 2 }],
            'vitest/no-alias-methods': 'error',
            'vitest/no-commented-out-tests': 'error',
            'vitest/no-conditional-expect': 'error',
            'vitest/no-conditional-in-test': 'warn',
            'vitest/no-disabled-tests': 'error',
            'vitest/no-done-callback': 'error',
            'vitest/no-duplicate-hooks': 'error',
            'vitest/no-focused-tests': 'error',
            'vitest/no-identical-title': 'error',
            'vitest/no-interpolation-in-snapshots': 'error',
            'vitest/no-large-snapshots': ['warn', { maxSize: 50 }],
            'vitest/no-mocks-import': 'error',
            'vitest/no-restricted-matchers': ['warn', {
                toBeTruthy: 'Avoid toBeTruthy; assert the specific condition instead.',
                toBeFalsy: 'Avoid toBeFalsy; assert the specific condition instead.'
            }],
            'vitest/no-standalone-expect': 'error',
            'vitest/no-test-prefixes': 'error',
            'vitest/no-test-return-statement': 'error',
            'vitest/padding-around-after-all-blocks': 'error',
            'vitest/padding-around-after-each-blocks': 'error',
            'vitest/padding-around-before-all-blocks': 'error',
            'vitest/padding-around-before-each-blocks': 'error',
            'vitest/padding-around-describe-blocks': 'error',
            'vitest/prefer-called-with': 'error',
            'vitest/prefer-comparison-matcher': 'error',
            'vitest/prefer-each': 'error',
            'vitest/prefer-equality-matcher': 'error',
            'vitest/prefer-expect-resolves': 'error',
            'vitest/prefer-hooks-in-order': 'warn',
            'vitest/prefer-hooks-on-top': 'warn',
            'vitest/prefer-lowercase-title': ['warn', { ignore: ['describe'] }],
            'vitest/prefer-mock-promise-shorthand': 'error',
            'vitest/prefer-snapshot-hint': 'warn',
            'vitest/prefer-spy-on': 'error',
            'vitest/prefer-strict-equal': 'error',
            'vitest/prefer-to-be': 'error',
            'vitest/prefer-to-contain': 'error',
            'vitest/prefer-to-have-length': 'warn',
            'vitest/prefer-todo': 'warn',
            'vitest/prefer-vi-mocked': 'error',
            'vitest/require-hook': ['error', { allowedFunctionCalls: [] }],
            'vitest/require-to-throw-message': 'error',
            'vitest/require-top-level-describe': 'error',
            'vitest/valid-describe-callback': 'error',
            'vitest/valid-expect': 'error',
            'vitest/valid-expect-in-promise': 'error',
            // Spec tables are literal test data, and describe/it.each callbacks nest and grow by design.
            '@typescript-eslint/no-magic-numbers': 'off',
            'max-lines-per-function': ['error', 140],
            'max-nested-callbacks': ['error', 7]
        }
    },
    {
        files: ['libs/**/*.html'],
        rules: {
            '@angular-eslint/template/cyclomatic-complexity': 'off', // TODO BP-1642: 12 sites in 4 templates (entry-table x7) need the templates split up
            '@angular-eslint/template/no-non-null-assertion': 'off' // TODO BP-1642: 15 `!` assertions in 9 templates (entry-table x7)
        }
    }
]);