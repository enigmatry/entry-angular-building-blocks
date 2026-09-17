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

## Upgrading to 22.x

**Requires stylelint 17.15 or later.** `selector-no-invalid`, `selector-no-unmatchable`, `unit-layout-mappings` and `value-keyword-layout-mappings` exist only from that release. The config also moves to `@stylistic/stylelint-plugin` 5.3 and `stylelint-scss` 7.2.

**Low risk in practice.** The four new core rules ship as `null`, and two projects (542 and 30 SCSS files) reported 0 problems both before and after the upgrade. A project that is clean on 21.x will almost certainly stay clean.

**Keep `--fix` out of the script CI runs.** A fixable violation repaired in an ephemeral checkout turns the build green while the committed source stays non-compliant. Split the scripts instead:

```json
{
    "scripts": {
        "lint": "stylelint \"src/**/*.scss\"",
        "lint:fix": "stylelint --fix \"src/**/*.scss\""
    }
}
```

Quote the glob. On Linux agents npm runs scripts through `/bin/sh`, which expands an unquoted `src/**/*.scss` as `src/*/*.scss` and silently lints a fraction of the files — Windows `cmd.exe` does not, so this only shows up on CI.

## License

Apache-2 © Enigmatry