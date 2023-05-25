import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from 'projects/entry-components/dialog/entry-dialog-config.model';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';
import { EntryDialogComponent, IEntryDialogButtonsConfig } from 'projects/entry-components/dialog/public-api';

interface ICustomDialogData {
  items: string[];
  message: string;
}

@Component({
  selector: 'app-custom-dialog-example',
  templateUrl: './custom-dialog-example.component.html',
  styleUrls: ['./custom-dialog-example.component.scss']
})
export class CustomDialogExampleComponent {
  customMessage = 'Isn\'t this logo cute?';

  constructor(private _entryDialog: EntryDialogService) { }

  openCustom = () => this._entryDialog.open(
      CustomDialogComponent,
      {
        items: [ 'Item 1', 'Item 2', 'Item 3' ],
        message: this.customMessage
      } as ICustomDialogData
    );
}


@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html'
})
export class CustomDialogComponent extends EntryDialogComponent {
  readonly buttons: IEntryDialogButtonsConfig = {
    confirmButtonText: 'Yes it is',
    cancelButtonText: '',
    buttonsAlignment: '',
    visible: true
  };
  constructor(
    protected mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) protected config: EntryDialogConfig,
    @Inject(MAT_DIALOG_DATA) public data: ICustomDialogData) {
    super(mdDialogRef, config);
  }
}
