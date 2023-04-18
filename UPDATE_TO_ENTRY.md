# Update to Entry

NPM package `@enigmatry/angular-building-blocks` will be removed. It is replaced with `@enigmatry/entry-table` and `@enigmatry/entry-form` packages.

## How to Migrate

### Prerequisites

Project backend is migrated to use Enigmatry.Entry nuget packages and CodeGeneration package is updated to the latest version.

Make sure to uninstall the old `enigmatry.codegeneration` tool and install the new one

```dotnet
dotnet tool uninstall enigmatry.codegeneration.console -g

dotnet tool update -g --add-source https://api.nuget.org/v3/index.json --ignore-failed-sources Enigmatry.Entry.CodeGeneration.Tools
```

### Remove packages

```npm
npm uninstall @enigmatry/angular-building-blocks

npm uninstall @enigmatry/formly-extensions
```

Remove `.npmrc` file.

### Install packages

```npm
npm i @enigmatry/entry-table

npm i @enigmatry/entry-form
```

#### Update to latest version

```npm
npm i @enigmatry/eslint-config

npm i @enigmatry/stylelint-config

npm i @enigmatry/scss-foundation
```

`@enigmatry` packages will be resolved from public repository.

### Fix imports and update renamed modules

#### What has changed?

| Import path | Summary of changes
|-|-|
| @enigmatry/angular-building-blocks | Replaced by @enigmatry/entry-table or @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/pagination | Replaced by @enigmatry/entry-table |
| @enigmatry/angular-building-blocks/enigmatry-grid | Replaced by @enigmatry/entry-table |
| @enigmatry/formly-extensions | Replaced by @enigmatry/entry-form |
| @enigmatry/angular-building-blocks/form | Replaced by @enigmatry/entry-form |
| EnigmatryGridComponent `<enigmatry-grid>` | Renamed to EntryTableComponent `<entry-table>` |
| `<enigmatry-formatted-value>` | Renamed to `<entry-cell-formatted-value>` |
| EnigmatryCommonModule | Removed |
| EnigmatryGridModule | Renamed to EntryTableModule |
| EnigmatryFormModule | Renamed to EntryFormModule |
| EnigmatryFormlyExtensionsModule | Renamed to EntryFormModule |
| FormConfig | Renamed to EntryFormConfig |
| ENIGMATRY_FORM_CONFIG | Renamed to ENTRY_FORM_CONFIG |
| ENIGMATRY_FIELD_TYPE_RESOLVER | Renamed to ENTRY_FIELD_TYPE_RESOLVER |
| SCSS using `scss-foundation/src/display/items` | Replaced by `scss-foundation/src/modules/display/items` |
| SCSS using `scss-foundation/src/layout/grid` | Replaced by `scss-foundation/src/modules/layout/grid` |
| SCSS using `angular-building-blocks/styles/partials/theming` | Replaced by 2 usings `entry-table/src/styles/partials/theming` & `entry-form/src/styles/partials/theming` |

### Run the code generation

Re-generate all components. Components and import paths will be adjusted to use new `entry-table` and `entry-form` modules in the generated code.
