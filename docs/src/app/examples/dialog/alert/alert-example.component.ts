import { Component } from '@angular/core';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';

@Component({
  selector: 'app-alert-example',
  templateUrl: './alert-example.component.html',
  styleUrls: ['./alert-example.component.scss']
})
export class AlertExampleComponent {

  constructor(private _entryDialog: EntryDialogService) { }

  openAlert = () => this._entryDialog.openAlert({
    title: `ALERT`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. `
    + `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, `
    + `when an unknown printer took a galley of type and scrambled it to make a type specimen book. `
    + `It has survived not only five centuries, but also the leap into electronic typesetting, `
    + `remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset `
    + `sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like `
    + `Aldus PageMaker including versions of Lorem Ipsum.`
  });
}
