import { Component, signal } from '@angular/core';
import { injectEntryDialog } from '@enigmatry/entry-components/dialog';
import { CustomDialogData } from './custom-dialog-data.interface';
import { CustomDialogResult } from './custom-dialog-result.interface';

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrl: './custom-dialog.component.scss',
    standalone: false
})
export class CustomDialogComponent {
    readonly dialog = injectEntryDialog<CustomDialogData, CustomDialogResult>();

    protected readonly comment = signal('');

    protected readonly answer = (response: string): void => this.dialog.close({ response, comment: this.comment() });
}
