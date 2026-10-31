import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { injectEntryDialog } from '../../inject-entry-dialog';
import { EntryAlertDialogData } from './entry-alert-dialog-data.interface';

@Component({
  selector: 'entry-alert-dialog',
  templateUrl: './entry-alert-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryAlertDialogComponent {
  protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly dialog = injectEntryDialog<EntryAlertDialogData, true>();
}
