import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { EntryDialogComponent } from '../entry-dialog.component';
import { IEntryConfirmDialogData } from './entry-confirm-dialog-data.interface';

@Component({
    selector: 'entry-confirm-dialog',
    templateUrl: './entry-confirm-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EntryConfirmDialogComponent extends EntryDialogComponent {
  constructor(
    protected override readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) public override readonly config: EntryDialogConfig,
    @Inject(MAT_DIALOG_DATA) readonly data: IEntryConfirmDialogData) {
    super(mdDialogRef, config);
  }
}
