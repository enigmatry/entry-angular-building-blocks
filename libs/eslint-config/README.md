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

## License

Apache-2 © Enigmatry