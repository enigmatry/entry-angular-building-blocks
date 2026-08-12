import { Component, inject, signal } from '@angular/core';
import { IEntryConfirmDialogData, EntryDialogButtonsAlignment, EntryDialogService } from '@enigmatry/entry-components/dialog';

@Component({
  selector: 'app-confirm-example',
  templateUrl: './confirm-example.component.html',
  standalone: false
})
export class ConfirmExampleComponent {
  confirmData: Partial<IEntryConfirmDialogData> = {
    title: `CONFIRM`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
    // confirmText: 'Ok',
    // cancelText: 'Cancel',
    buttonsAlignment: 'center',
    hideClose: true,
    disableClose: true
  };
  readonly confirmResponse = signal<boolean | undefined>(undefined);
  alignments: EntryDialogButtonsAlignment[] = ['start', 'center', 'end'];
  private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

  openConfirm = () => this.entryDialog
    .openConfirm(this.confirmData)
    .subscribe((response: boolean | undefined) => this.confirmResponse.set(response));
}
