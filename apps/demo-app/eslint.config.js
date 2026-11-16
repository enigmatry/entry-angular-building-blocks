import defaultEnigmatryConfiguration from '../../libs/eslint-config/index.js';
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultEnigmatryConfiguration,
    {
        // **/generated/** is entry-codegen output, committed exactly as emitted (see codegen/README.md).
        // Its templates use *ngIf, which prefer-control-flow rejects, it declares NgModules until the generator
        // emits standalone components (BP-1664), and it is never edited by hand.
        ignores: ['src/assets/**', 'src/**/generated/**']
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