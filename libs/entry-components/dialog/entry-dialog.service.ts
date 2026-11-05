import { inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, take } from 'rxjs';
import { EntryAlertDialogData } from './dialogs/alert/entry-alert-dialog-data.interface';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { EntryConfirmDialogData } from './dialogs/confirm/entry-confirm-dialog-data.interface';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryErrorDialogData } from './dialogs/error/entry-error-dialog-data.interface';
import { EntryErrorDialogComponent } from './dialogs/error/entry-error-dialog.component';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from './entry-dialog-config.model';
import { EntryDialogContent } from './entry-dialog-content.interface';
import { EntryDialogOpenArguments } from './entry-dialog-open-arguments.type';

/**
 * Used to open built-in and custom entry dialogs.
 */
@Injectable()
export class EntryDialogService {
  protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  private readonly matDialog: MatDialog = inject(MatDialog);

  /**
   * Opens alert dialog.
   *
   * @param data - Contains title, message and optional confirm button text
   * @returns `true` if confirmed, `undefined` if closed with the close button, by clicking on backdrop or pressing escape
   */
  readonly openAlert = (data: EntryAlertDialogData): Observable<true | undefined> =>
    this.open(EntryAlertDialogComponent, data, data.disableClose);

  /**
   * Opens confirm dialog.
   *
   * @param data - Contains title, message and optional confirm/cancel buttons text
   * @returns `true` if confirmed, `false` if canceled or closed with the close button, `undefined` if closed by clicking on backdrop or pressing escape
   */
  readonly openConfirm = (data: EntryConfirmDialogData): Observable<boolean | undefined> =>
    this.open(EntryConfirmDialogComponent, data, data.disableClose);

  /**
   * Opens error dialog.
   *
   * @param data - Contains title, errors and optional message and confirm button text
   * @returns `true` if confirmed, `undefined` if closed with the close button, by clicking on backdrop or pressing escape
   */
  readonly openError = (data: EntryErrorDialogData): Observable<true | undefined> =>
    this.open(EntryErrorDialogComponent, data, data.disableClose);

  /**
   * Opens dialog with custom component. The data and result types come from the component's `injectEntryDialog()` handle.
   *
   * @param component - Dialog custom component implementation
   * @param args - Data for the component (required when its data type does not accept `undefined`), optionally followed by
   * `disableClose` to disable closing dialog when pressing escape or clicking on backdrop and `cssClass` to set custom class
   * to Material overlay pane
   * @returns The result the component closes with, or `undefined` when the dialog is dismissed
   */
  readonly open = <TData, TResult>(
    component: Type<EntryDialogContent<TData, TResult>>,
    ...[data, disableClose, cssClass = '']: EntryDialogOpenArguments<NoInfer<TData>>
  ): Observable<TResult | undefined> => {
    const configuration = new MatDialogConfig<TData>();
    configuration.data = data;
    configuration.disableClose = disableClose ?? this.config.disableClose;
    configuration.panelClass = ['dialog-container', cssClass];

    return this.matDialog
      .open<EntryDialogContent<TData, TResult>, TData, TResult>(component, configuration)
      .afterClosed()
      .pipe(take(1));
  };

  /**
   * Closes all opened dialogs.
   */
  readonly closeAll = (): void => this.matDialog.closeAll();
}
