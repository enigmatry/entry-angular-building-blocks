import { Component, inject, signal } from '@angular/core';
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
    readonly result = signal<ICustomDialogResult | undefined>(undefined);
    private readonly entryDialog: EntryDialogService = inject(EntryDialogService);

    openCustom = () =>
        this.entryDialog.open(
            CustomDialogComponent,
            { question: this.question } as ICustomDialogData,
            true
        ).subscribe(result => this.result.set(result));
}
