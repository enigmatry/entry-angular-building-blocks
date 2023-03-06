# Update to Entry

Npm package `@enigmatry/angular-building-blocks` is replaced with `@enigmatry/entry-table` and `@enigmatry/entry-form` packages.

# What has changed?

| Import path | Summary of changes
|-|-|
| @enigmatry/angular-building-blocks | Replaced by @enigmatry/entry-table or @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/pagination | Replaced by @enigmatry/entry-table |
| @enigmatry/angular-building-blocks/enigmatry-grid | Replaced by @enigmatry/entry-table |
| @enigmatry/formly-extensions | Replaced by @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/form | Replaced by @enigmatry/entry-form |
| EnigmatryGridComponent `<enigmatry-grid>` | Renamed to EntryTableComponent `<entry-table>` |
| EnigmatryGridModule | Renamed to EntryTableModule |
| EnigmatryFormlyExtensionsModule | Renamed to EntryFormModule |
| ENIGMATRY_FORM_CONFIG | Renamed to ENTRY_FORM_CONFIG |
| ENIGMATRY_FIELD_TYPE_RESOLVER | Renamed to ENTRY_FIELD_TYPE_RESOLVER |

# How to Migrate
## Prerequisites

Enigmatry.Entry.CodeGeneration nuget packages should be updated to latest version v1.1.xxx.

## Remove packages 

```
npm uninstall @enigmatry/angular-building-blocks

npm uninstall @enigmatry/formly-extensions
```

Remove `.npmrc` file.


## Install packages

```
npm i @enigmatry/entry-table

npm i @enigmatry/entry-form
```

### Update to latest version

```
npm i @enigmatry/eslint-config

npm i @enigmatry/stylelint-config

npm i @enigmatry/scss-foundation
```

`@enigmatry` packages will be resolved from public repository.

## Update renamed modules and fix imports

See [What has changed?](#what-has-changed)

## Run the code generation

Re-generate all components. Components and import paths will be adjusted to use new `entry-table` and `entry-form` modules in the generated code.
