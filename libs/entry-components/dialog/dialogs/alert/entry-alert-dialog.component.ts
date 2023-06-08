import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { EntryDialogComponent } from '../entry-dialog.component';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { IEntryAlertDialogData } from './entry-alert-dialog-data.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';

@Component({
  selector: 'entry-alert-dialog',
  templateUrl: './entry-alert-dialog.component.html',
  styleUrls: ['./entry-alert-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntryAlertDialogComponent extends EntryDialogComponent {
  constructor(
    protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) public readonly config: EntryDialogConfig,
    @Inject(MAT_DIALOG_DATA) public data: IEntryAlertDialogData) {
    super(mdDialogRef, config);
  }
}
