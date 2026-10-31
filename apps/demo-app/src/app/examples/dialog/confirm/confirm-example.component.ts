import { Component, inject, signal } from '@angular/core';
import { EntryConfirmDialogData, EntryDialogButtonsAlignment, EntryDialogService } from '@enigmatry/entry-components/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm-example',
  templateUrl: './confirm-example.component.html',
  standalone: false
})
export class ConfirmExampleComponent {
  private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

  protected readonly confirmData: EntryConfirmDialogData = {
    title: `CONFIRM`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
    // confirmText: 'Ok',
    // cancelText: 'Cancel',
    buttonsAlignment: 'center',
    hideClose: true,
    disableClose: true
  };
  protected readonly confirmResponse = signal<boolean | undefined>(undefined);
  protected readonly alignments: EntryDialogButtonsAlignment[] = ['start', 'center', 'end'];

  protected readonly openConfirm = async(): Promise<void> =>
    this.confirmResponse.set(await firstValueFrom(this.entryDialog.openConfirm(this.confirmData)));
}
