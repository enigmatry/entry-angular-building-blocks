import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IValidationProblemDetails } from '@enigmatry/entry-components/validation';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../../entry-dialog-config.model';
import { injectEntryDialog } from '../../inject-entry-dialog';
import { EntryErrorDialogData } from './entry-error-dialog-data.interface';

@Component({
  selector: 'entry-error-dialog',
  templateUrl: './entry-error-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class EntryErrorDialogComponent {
  protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
  readonly dialog = injectEntryDialog<EntryErrorDialogData, true>();

  private readonly toMessages = (errors: string[] | IValidationProblemDetails): string[] =>
    Array.isArray(errors) ? errors : Object.values(errors.errors ?? {}).flat();

  protected readonly errors: string[] = this.toMessages(this.dialog.data.errors);
}
