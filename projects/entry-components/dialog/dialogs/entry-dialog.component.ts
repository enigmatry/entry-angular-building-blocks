import { Component, HostListener, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { IEntryDialogButtonsConfig } from '../entry-dialog-buttons-config.interface';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../entry-dialog-config.model';

@Component({
    selector: 'entry-dialog',
    templateUrl: './entry-dialog.component.html',
    styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent {

    @Input() title: string;
    @Input() buttons: IEntryDialogButtonsConfig = {
        buttonsAlignment: this.config.buttonsAlignment,
        confirmButtonText: this.config.confirmButtonText,
        cancelButtonText: this.config.cancelButtonText,
        visible: true
    };

    @Input() disableConfirm = false;
    @Input() buttonsTemplate: TemplateRef<any> | null | undefined;

    constructor(
        protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
        @Inject(ENTRY_DIALOG_CONFIG) protected readonly config: EntryDialogConfig) { }

    @Input() confirm: () => Observable<unknown> = () => of(true);
    @Input() cancel = () => this.close(false);

    @HostListener('keydown.esc')
    readonly onEsc = () => this.cancel();

    readonly onSubmit = () => {
        this.confirm().subscribe({
            next: closeDialog => {
                if (closeDialog) {
                    this.close(closeDialog);
                }
            }
        });
    };

    readonly close = (value: unknown = true) => this.mdDialogRef.close(value);
}
