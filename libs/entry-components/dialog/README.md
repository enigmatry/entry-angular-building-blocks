# Entry Dialog

Enables working with built-in (alert, confirm and error) and custom dialogs. Supports dialog configuration on application level.

## Integration

```npm
npm i @enigmatry/entry-components
```

`EntryDialogService` is provided in root, so opening a dialog needs no import. A custom dialog component imports the standalone `EntryDialogComponent` to render `<entry-dialog>`:

```ts
import { EntryDialogComponent } from '@enigmatry/entry-components/dialog';
```

`EntryDialogModule` still exists and still exports the dialog components, for `NgModule`-based code. Do not import it, or `MatDialogModule`, into a standalone dialog component: a dialog is created dynamically, and a standalone component that imports a module with providers is then given an injector of its own, with a second instance of everything those modules provide. Import `EntryDialogComponent` and Material's dialog directives instead.

Styles import:

```scss
@use 'entry-components/styles/generate' as entry;

@include entry.generate(APP_THEME, APP_TYPOGRAPHY);
```

Where `APP_THEME` represents application theming configuration, while `APP_TYPOGRAPHY` represents application fonts configuration.

## Basic usage

`EntryDialogService` opens the built-in dialogs. Each returns an `Observable` of the dialog's result:

```ts
private readonly entryDialog = inject(EntryDialogService);

readonly deleteUser = async(): Promise<void> => {
    const confirmed = await firstValueFrom(this.entryDialog.openConfirm({ title: 'Delete user', message: 'Delete this user?' }));
    if (confirmed) {
        ...
    }
};
```

`openConfirm` returns `true` when confirmed and `false` when canceled; every dialog returns `undefined` when it is dismissed with Escape or a backdrop click.

## Custom dialogs

A dialog component renders `<entry-dialog>` and gets a typed handle to its dialog from `injectEntryDialog<TData, TResult>()`. Assign the handle to a public `dialog` field: `EntryDialogService.open()` reads the data and result types from it.

```ts
@Component({
    selector: 'app-rename-dialog',
    template: `
        <entry-dialog title="Rename" [hideClose]="false" (confirmed)="dialog.close(name())">
            <mat-form-field>
                <mat-label>Name</mat-label>
                <input matInput [(ngModel)]="name">
            </mat-form-field>
        </entry-dialog>`,
    imports: [EntryDialogComponent, FormsModule, MatFormField, MatLabel, MatInput]
})
export class RenameDialogComponent {
    readonly dialog = injectEntryDialog<{ name: string }, string>();
    protected readonly name = signal(this.dialog.data.name);
}
```

```ts
// Observable<string | undefined>; the data is type-checked against the dialog's data type
const newName = await firstValueFrom(this.entryDialog.open(RenameDialogComponent, { name: user.name }));
```

- `(confirmed)` only notifies: the dialog stays open until the component calls `dialog.close(result)`.
- `(canceled)` is emitted by the cancel and close buttons. The dialog then closes with `undefined`, unless the handler already closed it; close synchronously to return a value of your own.
- Escape and backdrop clicks close the dialog with `undefined` without emitting `(canceled)`.

### Saving before closing

`dialog.submit(work)` keeps `dialog.submitting()` true until `work` settles and ignores repeated calls in the meantime, as well as calls made once the dialog is closing. Bind it to `[disableConfirm]`; a disabled confirm button stays focusable.

```ts
protected readonly save = (): Promise<void> => this.dialog.submit(async() => {
    try {
        this.dialog.close(await firstValueFrom(this.userClient.update(this.form.getRawValue())));
    } catch(error) {
        if (!(error instanceof HttpErrorResponse) || error.status !== HttpStatusCode.BadRequest) {
            throw error;
        }
        // The dialog stays open, so the user can correct the form
        setServerSideValidationErrors(error.error, this.form);
    }
});
```

```html
<form [formGroup]="form" (ngSubmit)="save()">
    <entry-dialog title="Edit user" [disableConfirm]="dialog.submitting()">
        ...
        <entry-form-errors [form]="form" />
    </entry-dialog>
</form>
```

Only validation errors are mapped onto the form; anything else is rethrown and reaches your global error handler.

Cancel, the close button, Escape and a backdrop click still close the dialog while a save is running. The save keeps going on the server, but the opener has already received `undefined` and the save's own `dialog.close(result)` is ignored, so data the opener reloads on close may not include the save yet. Blocking dismissal while saving would close this gap within the page, but a page reload during the save would still race the same way, so the dialog treats it like any other request still in flight. The dialog's result is not a completion signal: if the opener has to show the saved result, give it a signal of its own, such as a callback in the dialog data that the save calls once it succeeds, or a shared store the opener watches.

The confirm button is a submit button, so wrapping `<entry-dialog>` in your own `<form [formGroup]>` makes both the button and Enter in a field submit the form. Save from the form's `(ngSubmit)` rather than `(confirmed)`: `(confirmed)` fires on the button click, before the form commits the values of controls that update on `submit`, so it can read stale values. Keep `(confirmed)` for dialogs without a form, and never listen to both.

## Configuration

`ENTRY_DIALOG_CONFIG`: `InjectionToken<EntryDialogConfig>` - Optional configuration used to override defaults.

Default values are:

|Name|Type|Default value|Description|
|:------|:------|:------|:------|
|`confirmButtonText`|`string`|'Ok'|Confirm button label|
|`cancelButtonText`|`string`|'Cancel'|Cancel button label|
|`closeButtonLabel`|`string`|'Close dialog'|Accessible label of the close button|
|`buttonsAlignment`|`EntryDialogButtonsAlignment`|'end'|Dialog buttons horizontal alignment|
|`hideClose`|`boolean`|true|Hide the close button|
|`disableClose`|`boolean`|false|Disable closing dialog when pressing escape or clicking on backdrop|

To override with custom defaults use providers on application level:

```ts
import { provideEntryDialogConfig } from '@enigmatry/entry-components/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEntryDialogConfig({
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      closeButtonLabel: 'Close',
      buttonsAlignment: 'end',
      hideClose: false,
      disableClose: true
    })
  ]
};
```

Dialogs opened through the root `EntryDialogService` read the root configuration. A standalone route that provides a configuration of its own also needs `importProvidersFrom(EntryDialogModule)` in the same `providers`, which gives the route its own `EntryDialogService`, `MatDialog` and CDK `Dialog`. Listing only `EntryDialogService` is not enough: the dialog's content gets its injector from the CDK `Dialog`, so its buttons would keep the root configuration. An `EntryDialogModule` imported into a lazy-loaded module already behaves this way.
