import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogActions } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { injectEntryDialog, EntryDialogComponent } from '@enigmatry/entry-components/dialog';
import { CustomDialogData } from './custom-dialog-data.interface';
import { CustomDialogResult } from './custom-dialog-result.interface';

@Component({
    selector: 'app-custom-dialog',
    templateUrl: './custom-dialog.component.html',
    styleUrl: './custom-dialog.component.scss',
    imports: [EntryDialogComponent, MatFormField, MatLabel, MatInput, FormsModule, MatDialogActions, MatButton]
})
export class CustomDialogComponent {
    readonly dialog = injectEntryDialog<CustomDialogData, CustomDialogResult>();

    protected readonly comment = signal('');

    protected readonly answer = (response: string): void => this.dialog.close({ response, comment: this.comment() });
}
