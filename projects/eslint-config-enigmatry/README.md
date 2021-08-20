# eslint-config-enigmatry 

> ESLint [shareable config](http://eslint.org/docs/developer-guide/shareable-configs.html) for the Enigmatry style guide.

## Installation

```
$ npm install --save-dev eslint eslint-config-enigmatry
```

## Usage

Once the `eslint-config-enigmatry` package is installed, you can use it by specifying `@enigmatry/eslint-recommended` in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) section of your [ESLint configuration](http://eslint.org/docs/user-guide/configuring).

```js
{
  "extends": "@enigmatry/eslint-recommended",
  "rules": {
    // Additional, per-project rules...
  }
}
```

## License

Apache-2 © Enigmatry