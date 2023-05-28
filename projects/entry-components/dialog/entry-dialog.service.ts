import { Inject, Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { take } from 'rxjs/operators';
import { IEntryAlertDialogData } from './dialogs/alert/entry-alert-dialog-data.interface';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { Observable } from 'rxjs';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { IEntryConfirmDialogData } from './dialogs/confirm/entry-confirm-dialog-data.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from './entry-dialog-config.model';

@Injectable({
  providedIn: 'root'
})
export class EntryDialogService {
  constructor(
    @Inject(ENTRY_DIALOG_CONFIG) protected readonly config: EntryDialogConfig,
    private readonly matDialog: MatDialog) { }

  /**
   * Opens alert dialog
   *
   * @param data - Contains title, message and optional confirm button text of IEntryAlertDialogData type
   * @param disableClose - Optional parameter that disable closing dialog when pressing escape or clicking on backdrop
   * @returns Observable of any
   */
  openAlert = (
    data: IEntryAlertDialogData,
    disableClose: boolean | undefined = undefined): Observable<any> =>
    this.open(EntryAlertDialogComponent, data, disableClose);

  /**
   * Opens confirm dialog
   *
   * @param data - Contains title, message and optional confirm/cancel buttons text of IEntryConfirmDialogData type
   * @param disableClose - Optional parameter that disable closing dialog when pressing escape or clicking on backdrop
   * @returns Observable of bool or undefined, `true` if confirmed, `false` if canceled or closed
   * , `undefined` if closed by clicking on backdrop or pressing escape
   */
  openConfirm = (
    data: IEntryConfirmDialogData,
    disableClose: boolean | undefined = true): Observable<boolean | undefined> =>
    this.open(EntryConfirmDialogComponent, data, disableClose);

  /**
   * Opens dialog with custom component
   *
   * @param component - Dialog custom component implementation
   * @param data - Optional parameter used to supply component with input parameters
   * @param disableClose - Optional parameter that disable closing dialog when pressing escape or clicking on backdrop
   * @param cssClass - Optional parameter used to set custom class to Material overlay pane
   * @returns Observable of any containing result of dialog with custom component
   */
  open = (
    component: Type<EntryDialogComponent>,
    data: unknown = undefined,
    disableClose: boolean | undefined = undefined,
    cssClass: string = ''): Observable<any> => {
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

  close = (): void => this.matDialog.closeAll();

  private setPanelClassFor = <T>(configuration: MatDialogConfig<T>, cssClass: string) => {
    configuration.panelClass = ['dialog-container', cssClass];
  };
}
