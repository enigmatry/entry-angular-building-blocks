import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICustomDialogData } from './custom-dialog-example.component';
import { EntryDialogComponent, ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '@enigmatry/entry-components/dialog';

export interface ICustomDialogResult {
    response: string;
    comment: string;
}

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrls: ['./custom-dialog.component.scss'],
    standalone: false
})
export class CustomDialogComponent extends EntryDialogComponent {
    comment: string;

    constructor(
        protected override mdDialogRef: MatDialogRef<EntryDialogComponent>,
        @Inject(ENTRY_DIALOG_CONFIG) protected override config: EntryDialogConfig,
        @Inject(MAT_DIALOG_DATA) public data: ICustomDialogData) {
        super(mdDialogRef, config);
    }

    onClick = (response: string) =>
        this.close({ response, comment: this.comment } as ICustomDialogResult);
}
