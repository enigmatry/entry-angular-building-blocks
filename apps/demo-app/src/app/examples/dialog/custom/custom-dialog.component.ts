import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntryDialogComponent, ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '@enigmatry/entry-components/dialog';
import { ICustomDialogData } from './custom-dialog-example.component';

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
    protected override readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
    protected override readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
    readonly data: ICustomDialogData = inject(MAT_DIALOG_DATA);

    onClick = (response: string) =>
        this.close({ response, comment: this.comment } as ICustomDialogResult);
}
