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

  openAlert = (data: IEntryAlertDialogData): Observable<any> =>
    this.open(EntryAlertDialogComponent, data);

  readonly openConfirm = (data: IEntryConfirmDialogData): Observable<boolean | undefined> =>
    this.open(EntryConfirmDialogComponent, data);

  readonly open = (component: Type<EntryDialogComponent>, data: unknown = undefined, cssClass: string = '') => {
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
