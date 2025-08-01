import { Component, inject } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';

@Component({
    selector: 'app-alert-example',
    templateUrl: './alert-example.component.html',
    standalone: false
})
export class AlertExampleComponent {
  private readonly _entryDialog: EntryDialogService = inject(EntryDialogService);

  openAlert = () => this._entryDialog.openAlert({
    title: `ALERT`,
    message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
    // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
    // confirmText: 'Ok',
    // buttonsAlignment: 'align-center',
    // hideClose: true,
    // disableClose: false
  });
}
