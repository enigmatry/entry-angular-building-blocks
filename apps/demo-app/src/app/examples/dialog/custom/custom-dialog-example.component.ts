import { Component } from '@angular/core';
import { CustomDialogComponent, ICustomDialogResult } from './custom-dialog.component';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';

export interface ICustomDialogData {
    question: string;
}

@Component({
    selector: 'app-custom-dialog-example',
    templateUrl: './custom-dialog-example.component.html',
    styleUrls: ['./custom-dialog-example.component.scss']
})
export class CustomDialogExampleComponent {
    question = 'Isn\'t this logo cute?';
    result: ICustomDialogResult;

    constructor(private _entryDialog: EntryDialogService) { }

    openCustom = () =>
        this._entryDialog.open(
            CustomDialogComponent,
            { question: this.question } as ICustomDialogData,
            true
        )
        .subscribe(result => this.result = result);
}
