import defaultEnigmatryConfiguration from '../../libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        ignores: ['src/assets/**']
    },
    {
        files: ['src/**/*.ts'],
        rules: {
            '@typescript-eslint/no-unnecessary-condition': 'error'
        }
    },
    {
        // The example implements the abstract EntryPermissionService and its component provides it against that token.
        files: ['src/app/examples/permissions/permissions-example/permission.service.ts'],
        rules: {
            '@angular-eslint/use-injectable-provided-in': 'off'
        }
    },
    {
        // TODO BP-1646: the Formly examples and the Form page stay NgModule-declared until Formly is removed.
        // form/form-example/generated/ is entry-codegen output and stays that way until the generator emits standalone components (BP-1664).
        files: ['src/app/examples/form/**/*.ts', 'src/app/examples/validation/formly/**/*.ts'],
        rules: {
            '@angular-eslint/prefer-standalone': 'off'
        }
    },
    {
        files: ['src/**/*.html'],
        rules: {
            '@angular-eslint/template/cyclomatic-complexity': 'off' // TODO BP-1642: 1 site, the example viewer template, needs splitting up
        }
    }
]);