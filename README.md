# Entry Angular Building Blocks

## Projects

| Project | Description |
|-|-|
| [@enigmatry/entry-components](./libs/entry-components/README.md) | Angular components |
| [@enigmatry/entry-form](./libs/entry-form/README.md) | Angular form components |
| [@enigmatry/eslint-config](./libs/eslint-config/README.md) | ESLint config for the Enigmatry style guide |
| [@enigmatry/scss-foundation ](./libs/scss-foundation/README.md) | SCSS Foundation |
| [@enigmatry/stylelint-config](./libs/stylelint-config/README.md) | Stylelint config for the Enigmatry style guide |

## Components Demo

Visit components demo application. [Website](https://entry-demo.enigmatry.com/)

## Compatibility with Angular versions

| @enigmatry/entry-components | Angular version
|-|-|
|14.x| = 14
|15.x| = 15
|16.x| = 16
|17.x| = 17
|18.x| = 18
|19.x| = 19
|20.x| = 20
|21.x| = 21
|22.x| = 22

## Releases and previews

All five packages are published under the same npm dist-tags:

| Dist-tag | Install with | What you get |
|-|-|-|
| `latest` | `npm i @enigmatry/entry-components` | The newest release. A plain install, with no version, resolves to this. |
| `next` | `npm i @enigmatry/entry-components@next` | A preview built from every merge to `master`, e.g. `22.0.0-preview.12`. Not a release, and it changes with every merge. |
| `v<major>-lts` | `npm i @enigmatry/entry-components@v21-lts` | Patches for an older major, published from its `release/<major>` branch once a newer major is `latest`. |

Previews never move `latest`, so a plain install always gets a release.

To try a preview, pin the exact version with `--save-exact` (`npm i -E @enigmatry/entry-components@22.0.0-preview.12`) rather than depending on `@next`. `next` moves on every merge. Without `-E`, npm saves `^22.0.0-preview.12`, which also accepts later previews and every 22.x release, so a fresh install can quietly move you off the preview you tested. A pre-release version also satisfies no ordinary range such as `^22.0.0`. Install the same preview version of every `@enigmatry/*` package you use; they are built together.

## Migrate project to entry

[How to migrate project to entry](https://github.com/enigmatry/entry-angular-building-blocks/wiki/Migrate-project-to-Entry)

## License

Apache-2 © Enigmatry
