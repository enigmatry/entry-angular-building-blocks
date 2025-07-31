import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
  protected override readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
  override readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly data: IEntryConfirmDialogData = inject(MAT_DIALOG_DATA);
}
