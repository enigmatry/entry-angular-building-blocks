import { Component } from '@angular/core';
import { EntryDialogService } from 'projects/entry-components/entry-dialog/entry-dialog.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  confirmResponse: boolean | undefined;

  constructor(private _entryDialog: EntryDialogService) { }

  openConfirm = () => this._entryDialog
    .openConfirm({
      title: `CONFIRM`,
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `
      + `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, `
      + `when an unknown printer took a galley of type and scrambled it to make a type specimen book. `
      + `It has survived not only five centuries, but also the leap into electronic typesetting, `
      + `remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset `
      + `sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like `
      + `Aldus PageMaker including versions of Lorem Ipsum.`
    })
    .subscribe((response: boolean | undefined) => this.confirmResponse = response);
}