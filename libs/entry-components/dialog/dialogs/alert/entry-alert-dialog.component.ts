import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { EntryDialogComponent } from '../entry-dialog.component';
import { IEntryAlertDialogData } from './entry-alert-dialog-data.interface';

@Component({
  selector: 'entry-alert-dialog',
  templateUrl: './entry-alert-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryAlertDialogComponent extends EntryDialogComponent {
  protected override readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
  override readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly data: IEntryAlertDialogData = inject(MAT_DIALOG_DATA);
}
