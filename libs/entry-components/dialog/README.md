# Entry Dialog

Enables working with built-in (alert and confirm) and custom dialogs. Supports dialog configuration on application level.

## Integration

```npm
npm i @enigmatry/entry-components
```

Import component package:

```ts
import { EntryDialogModule } from '@enigmatry/entry-components/dialog';
```

Styles import:

```scss
@use 'entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

`EntryDialogService` is used to open dialogs:

```ts
constructor (entryDialogService: EntryDialogService) {
    entryDialogService.openAlert({
        title: 'ALERT!', message: 'I want to tell you that I love you :)'
    });
}
```

## Configuration

`ENTRY_DIALOG_CONFIG`: `InjectionToken<EntryDialogConfig>` - Optional configuration used to override defaults.

Default values are:

|Name|Type|Default value|Description|
|:------|:------|:------|:------|
|`confirmButtonText`|`string`|'Ok'|Confirm button label|
|`cancelButtonText`|`string`|'Cancel'|Cancel button label|
|`buttonsAlignment`|`EntryDialogButtonsAlignment`|'end'|Dialog buttons horizontal alignment|
|`hideClose`|`boolean`|true|Determines if close button is visible|
|`disableClose`|`boolean`|false|Disable closing dialog when pressing escape or clicking on backdrop|

To override with custom defaults use providers on application level:

```ts
import { EntryDialogModule, provideEntryDialogConfig } from '@enigmatry/entry-components/dialog';

@NgModule({
  imports: [
    EntryDialogModule
  ],
  providers: [
    provideEntryDialogConfig({
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      buttonsAlignment: 'end',
      hideClose: false,
      disableClose: true
    })
  ]
})
export class AppModule { }
```
