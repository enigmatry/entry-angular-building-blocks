# @enigmatry/stylelint-config

> Enigmatry's shareable config for stylelint.

To see the rules that this config uses, please read the [config itself](./index.js).

## Installation

```
npm install stylelint @enigmatry/stylelint-config --save-dev
```

## Usage

Just set your `stylelint` config to:

```json
{
  "extends": "@enigmatry/stylelint-config"
}
```


### Extending the config

Simply add a `"rules"` key to your config, then add your overrides and additions there.

For example, to change the `at-rule-no-unknown` rule to use its `ignoreAtRules` option, change the `indentation` to tabs, turn off the `number-leading-zero` rule, and add the `unit-allowed-list` rule:

```json
{
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["extends", "ignores"]
      }
    ],
    "indentation": "tab",
    "number-leading-zero": null,
    "unit-allowed-list": ["em", "rem", "s"]
  }
}
```

## License

Apache-2 © Enigmatry