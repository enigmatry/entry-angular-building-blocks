import { Inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IEntryAlertDialogData } from './dialogs/alert/entry-alert-dialog-data.interface';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { IEntryConfirmDialogData } from './dialogs/confirm/entry-confirm-dialog-data.interface';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { IEntryErrorDialogData } from './dialogs/error/entry-error-dialog-data.interface';
import { EntryErrorDialogComponent } from './dialogs/error/entry-error-dialog.component';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from './entry-dialog-config.model';

/**
 * Used to open built-in and custom entry dialogs.
 */
@Injectable()
export class EntryDialogService {
  constructor(
    @Inject(ENTRY_DIALOG_CONFIG) protected readonly config: EntryDialogConfig,
    private readonly matDialog: MatDialog) { }

  /**
   * Opens alert dialog.
   *
   * @param data - Contains title, message and optional confirm button text
   * @returns `true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape
   */
  openAlert = (data: Partial<IEntryAlertDialogData>): Observable<true | undefined> => {
    data.disableClose = data.disableClose === undefined ? this.config.disableClose : data.disableClose;
    return this.open(EntryAlertDialogComponent, data, data.disableClose);
  };

  /**
   * Opens confirm dialog.
   *
   * @param data - Contains title, message and optional confirm/cancel buttons text
   * @returns `true` if confirmed, `false` if canceled or closed, `undefined` if closed by clicking on backdrop or pressing escape
   */
  openConfirm = (data: Partial<IEntryConfirmDialogData>): Observable<boolean | undefined> => {
    data.disableClose = data.disableClose === undefined ? this.config.disableClose : data.disableClose;
    return this.open(EntryConfirmDialogComponent, data, data.disableClose);
  };

  /**
   * Opens error dialog.
   *
   * @param data - Contains title, errors and optional confirm button text
   * @returns `true` if confirmed, `undefined` if closed by clicking on backdrop or pressing escape
   */
  openError = (data: Partial<IEntryErrorDialogData>): Observable<true | undefined> => {
    data.disableClose = data.disableClose === undefined ? this.config.disableClose : data.disableClose;
    return this.open(EntryErrorDialogComponent, data, data.disableClose);
  };

  /**
   * Opens dialog with custom component.
   *
   * @param component - Dialog custom component implementation
   * @param data - Optional parameter used to supply component with input parameters
   * @param disableClose - Optional parameter that disable closing dialog when pressing escape or clicking on backdrop
   * @param cssClass - Optional parameter used to set custom class to Material overlay pane
   * @returns Any result custom implementation provides
   */
  open = (
    component: Type<EntryDialogComponent>,
    data: unknown = undefined,
    disableClose: boolean | undefined = undefined,
    cssClass = ''): Observable<any> => {
    const configuration = new MatDialogConfig<unknown>();
    configuration.data = data;
    configuration.disableClose = disableClose === undefined
      ? this.config.disableClose
      : disableClose;
    this.setPanelClassFor(configuration, cssClass);

    return this.matDialog
      .open(component, configuration)
      .afterClosed()
      .pipe(take(1));
  };

  /**
   * Closes all opened dialogs.
   */
  closeAll = (): void => this.matDialog.closeAll();

  private setPanelClassFor = <T>(configuration: MatDialogConfig<T>, cssClass: string) => {
    configuration.panelClass = ['dialog-container', cssClass];
  };
}
