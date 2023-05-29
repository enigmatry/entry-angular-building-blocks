import { Component } from '@angular/core';
import { IEntryAlertDialogData } from 'projects/entry-components/dialog/dialogs/alert/entry-alert-dialog-data.interface';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';

@Component({
  selector: 'app-alert-example',
  templateUrl: './alert-example.component.html',
  styleUrls: ['./alert-example.component.scss']
})
export class AlertExampleComponent {
  alertData: Partial<IEntryAlertDialogData> = {
    title: `ALERT`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
    // Optional properties:
    // confirmText: 'Ok',
    // buttonsAlignment: 'align-center',
    // hideClose: true,
    // disableClose: false
  };

  constructor(private _entryDialog: EntryDialogService) { }

  openAlert = () => this._entryDialog.openAlert(this.alertData);
}
