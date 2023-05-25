import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from 'projects/entry-components/dialog/entry-dialog-config.model';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';
import { EntryDialogComponent, IEntryDialogButtonsConfig } from 'projects/entry-components/dialog/public-api';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.scss']
})
export class CustomDialogComponent {

  constructor(private _entryDialog: EntryDialogService) { }

  openCustom = () =>
    this._entryDialog.open(AlertWithImageComponent);
}

@Component({
  selector: 'app-alert-with-image',
  templateUrl: './alert-with-image.component.html',
  styleUrls: ['./alert-with-image.component.scss']
})
export class AlertWithImageComponent extends EntryDialogComponent {
  readonly buttons: IEntryDialogButtonsConfig = {
    confirmButtonText: 'Yes it is',
    cancelButtonText: '',
    buttonsAlignment: '',
    visible: true
  };
  constructor(
    protected mdDialogRef: MatDialogRef<EntryDialogComponent>,
    @Inject(ENTRY_DIALOG_CONFIG) protected config: EntryDialogConfig) {
    super(mdDialogRef, config);
  }
}
