import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { IEntryDialogButtonsConfig } from '../../entry-dialog-buttons-config.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EntryDialogComponent } from '../entry-dialog.component';
import { IEntryConfirmDialogData } from './entry-confirm-dialog-data.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';

@Component({
  selector: 'entry-confirm-dialog',
  templateUrl: './entry-confirm-dialog.component.html',
  styleUrls: ['./entry-confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryConfirmDialogComponent extends EntryDialogComponent {
  readonly buttons: IEntryDialogButtonsConfig = {
    confirmButtonText: this.data.confirmText ?? this.config.confirmButtonText,
    cancelButtonText: this.data.cancelText ?? this.config.cancelButtonText,
    buttonsAlignment: 'align-right',
    visible: true
  };

  constructor(
    protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) protected readonly config: EntryDialogConfig,
    @Inject(MAT_DIALOG_DATA) readonly data: IEntryConfirmDialogData) {
    super(mdDialogRef, config);
  }
}