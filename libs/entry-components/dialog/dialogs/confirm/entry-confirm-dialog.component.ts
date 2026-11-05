import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { injectEntryDialog } from '../../inject-entry-dialog';
import { EntryConfirmDialogData } from './entry-confirm-dialog-data.interface';

@Component({
  selector: 'entry-confirm-dialog',
  templateUrl: './entry-confirm-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryConfirmDialogComponent {
  protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly dialog = injectEntryDialog<EntryConfirmDialogData, boolean>();
}
