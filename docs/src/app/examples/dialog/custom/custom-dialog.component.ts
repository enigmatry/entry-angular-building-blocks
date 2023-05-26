import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IEntryDialogButtonsConfig } from 'projects/entry-components/dialog/entry-dialog-buttons-config.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from 'projects/entry-components/dialog/entry-dialog-config.model';
import { EntryDialogComponent } from 'projects/entry-components/dialog/public-api';
import { ICustomDialogData } from './custom-dialog-example.component';

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
