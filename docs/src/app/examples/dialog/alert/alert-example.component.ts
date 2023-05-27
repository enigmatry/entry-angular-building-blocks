import { Component } from '@angular/core';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';

@Component({
  selector: 'app-alert-example',
  templateUrl: './alert-example.component.html',
  styleUrls: ['./alert-example.component.scss']
})
export class AlertExampleComponent {
  disableClose = false;

  constructor(private _entryDialog: EntryDialogService) { }

  openAlert = () => this._entryDialog
    .openAlert({
      title: `ALERT`,
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    }, this.disableClose);
}
