import { Component } from '@angular/core';
import { IEntryConfirmDialogData, EntryDialogButtonsAlignment, EntryDialogService } from '@enigmatry/entry-components/dialog';

@Component({
  selector: 'app-confirm-example',
  templateUrl: './confirm-example.component.html',
  styleUrls: ['./confirm-example.component.scss']
})
export class ConfirmExampleComponent {
  confirmData: Partial<IEntryConfirmDialogData> = {
    title: `CONFIRM`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
    // confirmText: 'Ok',
    // cancelText: 'Cancel',
    buttonsAlignment: 'align-center',
    hideClose: true,
    disableClose: true
  };
  confirmResponse: boolean | undefined;
  alignments: EntryDialogButtonsAlignment[] = ['', 'align-center', 'align-right'];

  constructor(private _entryDialog: EntryDialogService) { }

  openConfirm = () => this._entryDialog
    .openConfirm(this.confirmData)
    .subscribe((response: boolean | undefined) => this.confirmResponse = response);
}
