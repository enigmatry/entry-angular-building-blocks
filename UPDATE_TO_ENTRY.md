# Update to Entry

Npm packages @enigmatry/entry-table and @enigmatry/entry-form will replace @enigmatry/angular-building-blocks package. Components and modules are renamed to have "Entry" instead of "Enigmatry" in module name.

# What has changed?

| Import path | Summary of changes
|-|-|
| @enigmatry/angular-building-blocks | Replaced by @enigmatry/entry-table or @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/pagination | Replaced by @enigmatry/entry-table |
| @enigmatry/angular-building-blocks/enigmatry-grid | Replaced by @enigmatry/entry-table |
| @enigmatry/formly-extensions | Replaced by @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/form | Replaced by @enigmatry/entry-form |
| EnigmatryGridComponent: \<enigmatry-grid\> | Renamed to EntryTableComponent: \<entry-table\> |
| EnigmatryGridModule | Renamed to EntryTableModule |
| EnigmatryFormlyExtensionsModule | Renamed to EntryFormModule |
| ENIGMATRY_FORM_CONFIG | Renamed to ENTRY_FORM_CONFIG |
| ENIGMATRY_FIELD_TYPE_RESOLVER | Renamed to ENTRY_FIELD_TYPE_RESOLVER |

#  How to Migrate
## Prerequisites

Backend solution should be migrated to Entry and Enigmatry.Entry.CodeGeneration nuget packages updated to latest version v1.1.xxx.

## Remove packages 

```npm uninstall @enigmatry/angular-building-blocks```

```npm uninstall @enigmatry/formly-extensions```

Remove file ```.npmrc```


## Install packages

```npm i @enigmatry/entry-table``` 

```npm i @enigmatry/entry-form```

### Update to latest version

```npm i @enigmatry/eslint-config``` 

```npm i @enigmatry/stylelint-config```

```npm i @enigmatry//scss-foundation```

@enigmatry packages will be resolved from public repository npmjs.org

## Update renamed modules and fix imports

See changes: [What has changed?](#what-has-changed?)

## Run the code generation

Re-generate all components. Components and import paths will be adjusted to use new entry-table and entry-form modules in the generated code.