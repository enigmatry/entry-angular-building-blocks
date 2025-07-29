import { Component, inject } from '@angular/core';
import { EntryDialogService } from '@enigmatry/entry-components/dialog';
import { CustomDialogComponent, ICustomDialogResult } from './custom-dialog.component';

export interface ICustomDialogData {
    question: string;
}

@Component({
    selector: 'app-custom-dialog-example',
    templateUrl: './custom-dialog-example.component.html',
    standalone: false
})
export class CustomDialogExampleComponent {
    question = 'Isn\'t this logo cute?';
    result: ICustomDialogResult;
    private readonly _entryDialog: EntryDialogService = inject(EntryDialogService);

    openCustom = () =>
        this._entryDialog.open(
            CustomDialogComponent,
            { question: this.question } as ICustomDialogData,
            true
        ).subscribe(result => this.result = result);
}
