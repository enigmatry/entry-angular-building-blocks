import { Injectable, Type } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EntryDialogComponent } from './dialogs/entry-dialog.component';
import { take } from 'rxjs/operators';
import { IEntryAlertDialogData } from './dialogs/alert/entry-alert-dialog-data.interface';
import { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
import { Observable } from 'rxjs';
import { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
import { IEntryConfirmDialogData } from './dialogs/confirm/entry-confirm-dialog-data.interface';

@Injectable({
  providedIn: 'root'
})
export class EntryDialogService {
  constructor(private readonly matDialog: MatDialog) { }

  /**
   * Opens alert dialog
   *
   * @param data - Contains title, message and optional confirm button text of IEntryAlertDialogData type
   *
   * @returns nothing
   */
  openAlert = (data: IEntryAlertDialogData): Observable<any> =>
    this.open(EntryAlertDialogComponent, data);

  /**
   * Opens confirm dialog
   *
   * @param data - Contains title, message and optional confirm/cancel buttons text of IEntryConfirmDialogData type
   *
   * @returns Observable<bool | undefined>, `true` if confirmed, `false` if canceled or closed, 
   * `undefined` if closed by clicking outside of the dialog
   */
  openConfirm = (data: IEntryConfirmDialogData): Observable<boolean | undefined> =>
    this.open(EntryConfirmDialogComponent, data);

  /**
   * Opens dialog with custom component
   *
   * @param component - Dialog custom component implementation
   * @param data - Optional parameter used to supply component with input parameters
   * @param cssClass - Optional parameter used to set custom class to Material overlay pane
   *
   * @returns Observable<any> containing result of dialog with custom component
   */
  open = (
    component: Type<EntryDialogComponent>,
    data: unknown = undefined,
    cssClass: string = ''): Observable<any> => {
    const configuration = new MatDialogConfig<unknown>();
    configuration.data = data;
    this.setPanelClassFor(configuration, cssClass);

    return this.matDialog
      .open(component, configuration)
      .afterClosed()
      .pipe(take(1));
  };

  readonly close = (): void => this.matDialog.closeAll();

  private setPanelClassFor = <T>(configuration: MatDialogConfig<T>, cssClass: string) => {
    configuration.panelClass = ['dialog-container', cssClass];
  };
}
