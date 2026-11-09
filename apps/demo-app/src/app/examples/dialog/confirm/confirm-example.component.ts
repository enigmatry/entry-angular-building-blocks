import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { EntryConfirmDialogData, EntryDialogButtonsAlignment, EntryDialogService } from '@enigmatry/entry-components/dialog';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-confirm-example',
  templateUrl: './confirm-example.component.html',
  imports: [MatCheckbox, FormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatButton, EntryButtonDirective]
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
