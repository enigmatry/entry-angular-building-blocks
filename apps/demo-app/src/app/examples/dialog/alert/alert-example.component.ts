import { Component } from '@angular/core';
import { EntryDialogService, IEntryAlertDialogData } from '@enigmatry/entry-components/dialog';

@Component({
  selector: 'app-alert-example',
  templateUrl: './alert-example.component.html',
  styleUrls: ['./alert-example.component.scss']
})
export class AlertExampleComponent {
  alertData: Partial<IEntryAlertDialogData> = {
    title: `ALERT`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
    // confirmText: 'Ok',
    // buttonsAlignment: 'align-center',
    // hideClose: true,
    // disableClose: false
  };

  constructor(private _entryDialog: EntryDialogService) { }

  openAlert = () => this._entryDialog.openAlert(this.alertData);
}
