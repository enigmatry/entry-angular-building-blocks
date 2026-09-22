# @enigmatry/eslint-config

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for the Enigmatry style guide.

## Installation

```
$ npm install --save-dev eslint @enigmatry/eslint-config
```

## Usage

Once the `@enigmatry/eslint-config` package is installed, you can use it by specifying `@enigmatry/eslint-config` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

```js
import defaultConfiguration from "@enigmatry/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
    ...defaultConfiguration,
    {
        "files": ["src/**/*.ts"],
        "rules": {
            // Additional, per-project rules...
        }
    }
]);
```

## Upgrading to 22.x

The 22.x line tracks Angular 22 and enables the full `@angular-eslint` and `@angular-eslint/template` rule sets. Expect a large first run. These are the points that actually bite:

**This is the Angular 22 line.** It requires angular-eslint 22, ESLint 10 and typescript-eslint 8.70. Angular 21 projects stay on 21.x until they upgrade.

**Do not run `eslint --fix` unreviewed.** `@angular-eslint/prefer-service-decorator` rewrites `@Injectable({ providedIn: 'root' })` into `@Service()`, which exists only in Angular 22. On an Angular 21 codebase that autofix produces code that does not compile — a trial run on a ~900-component app turned 66 services into `'@angular/core' has no exported member 'Service'` build errors. Fix in batches and build after each one.

**Templates are linted for the first time.** Until 22.x the config's HTML glob was `*.html`, which matches only the project root, so no template rule ever ran on a real project. It is now `**/*.html`. Nothing about your templates changed — the backlog was simply invisible. On that same ~900-component app the first run reported roughly 1700 violations, about 70% of them auto-fixable, led by `template/prefer-self-closing-tags`, `template/attributes-order` and `consistent-component-styles`.

**Selectors ship `off`.** `component-selector` and `directive-selector` are off because a shared config cannot know your prefix. Re-enable them with your own:

```js
rules: {
    "@angular-eslint/component-selector": ["error", { "type": "element", "prefix": "app", "style": "kebab-case" }],
    "@angular-eslint/directive-selector": ["error", { "type": "attribute", "prefix": "app", "style": "camelCase" }]
}
```

**Staging the migration.** Prefer taking the config whole and relaxing the rules you have not burned down yet over staying on the old version:

Keep the TypeScript and template rules in separate objects: the `@angular-eslint/template` plugin is only registered for the HTML files, so naming a `template/*` rule in an object that also matches `**/*.ts` fails the whole run with `could not find plugin "@angular-eslint/template"` and nothing gets linted.

```js
export default defineConfig([
    ...defaultConfiguration,
    {
        "files": ["src/**/*.ts"],
        "rules": {
            // TODO: burn down, then delete this block
            "@angular-eslint/consistent-component-styles": "warn",
            "@angular-eslint/prefer-signals": "off"
        }
    },
    {
        "files": ["src/**/*.html"],
        "rules": {
            // TODO: burn down, then delete this block
            "@angular-eslint/template/prefer-self-closing-tags": "warn",
            "@angular-eslint/template/attributes-order": "warn"
        }
    }
]);
```

## License

Apache-2 © Enigmatry