import { Component } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';

@Component({
  selector: 'app-error-dialog-example',
  templateUrl: './error-example.component.html',
})
export class ErrorDialogExampleComponent {

  constructor(private _entryDialog: EntryDialogService) { }

  openError = () => this._entryDialog.openError({
    title: `Error`,
    errors: [
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`,
      `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    ],
  });
}
