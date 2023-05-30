import { Component, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../entry-dialog-config.model';
import { EntryDialogButtonsAlignment } from '../entry-dialog-buttons-alignment.type';

/**
 * Base Entry dialog component. Must be extended when building custom dialogs.
 */
@Component({
    selector: 'entry-dialog',
    templateUrl: './entry-dialog.component.html',
    styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent {
    /** Dialog header title  */
    @Input() title: string;
    /** Dialog buttons horizontal alignment */
    @Input() buttonsAlignment: EntryDialogButtonsAlignment = this.config.buttonsAlignment;
    /** Confirm button label */
    @Input() confirmButtonText = this.config.confirmButtonText;
    /** Cancel button label */
    @Input() cancelButtonText = this.config.cancelButtonText;
    /** Show or hide dialog buttons */
    @Input() hideButtons: boolean;
    /** Show or hide dialog cancel button */
    @Input() hideCancel: boolean;
    /** Show or hide dialog close button */
    @Input() hideClose: boolean = this.config.hideClose;
    /** Enable or disable dialog confirm button */
    @Input() disableConfirm: boolean;
    /** Provide custom buttons template */
    @Input() buttonsTemplate: TemplateRef<any> | null | undefined;

    constructor(
        protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent>,
        @Inject(ENTRY_DIALOG_CONFIG) protected readonly config: EntryDialogConfig) { }

    @Input() confirm: () => Observable<unknown> = () => of(true);
    @Input() cancel = () => this.close(false);

    // @HostListener('keydown.esc')
    // onEsc = () => {
    //     if (!this.disableClose) {
    //         this.cancel();
    //     }
    // };

    onSubmit = () =>
        this.confirm().subscribe({
            next: closeDialog => {
                if (closeDialog) {
                    this.close(closeDialog);
                }
            }
        });

    close = (value: unknown = true) => this.mdDialogRef.close(value);
}
