import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';

@Component({
    selector: 'app-alert-example',
    templateUrl: './alert-example.component.html',
    imports: [MatButton, EntryButtonDirective]
})
export class AlertExampleComponent {
  private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

  protected readonly openAlert = (): void => {
    this.entryDialog.openAlert({
      title: `ALERT`,
      message: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.`
      // Optional properties (if not provided, default values are used from ENTRY_DIALOG_CONFIG):
      // confirmText: 'Ok',
      // buttonsAlignment: 'center',
      // hideClose: true,
      // disableClose: false
    });
  };
}
