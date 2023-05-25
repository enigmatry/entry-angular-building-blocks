import { Component } from '@angular/core';
import { EntryDialogService } from 'projects/entry-components/dialog/entry-dialog.service';
import { CustomDialogComponent } from './custom-dialog.component';

export interface ICustomDialogData {
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
            items: ['Item 1', 'Item 2', 'Item 3'],
            message: this.customMessage
        } as ICustomDialogData
    );
}
