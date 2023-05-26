import { Component } from '@angular/core';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';

@Component({
  selector: 'app-confirm-example',
  templateUrl: './confirm-example.component.html',
  styleUrls: ['./confirm-example.component.scss']
})
export class ConfirmExampleComponent {
  confirmResponse: boolean | undefined;
  disableClose = true;

  constructor(private _entryDialog: EntryDialogService) { }

  openConfirm = () => this._entryDialog
    .openConfirm({
      title: `CONFIRM`,
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    }, this.disableClose)
    .subscribe((response: boolean | undefined) => this.confirmResponse = response);
}
