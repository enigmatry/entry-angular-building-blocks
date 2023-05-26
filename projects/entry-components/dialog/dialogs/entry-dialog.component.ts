import { Component, HostListener, Inject, Input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../entry-dialog-config.model';

/**
 * Base Entry dialog component. Must be extended when building custom dialogs.
 */
@Component({
    selector: 'entry-dialog',
    templateUrl: './entry-dialog.component.html',
    styleUrls: ['./entry-dialog.component.scss']
})
export class EntryDialogComponent {
    /** @property title - Dialog header title  */
    @Input() title: string;
    /** @property buttonsAlignment - Dialog buttons horizontal alignment */
    @Input() buttonsAlignment: 'align-right' | 'align-center' | '' = this.config.buttonsAlignment;
    /** @property confirmButtonText - Confirm button label */
    @Input() confirmButtonText = this.config.confirmButtonText;
    /** @property cancelButtonText - Cancel button label */
    @Input() cancelButtonText = this.config.cancelButtonText;
    /** @property hideButtons - Show or hide dialog buttons */
    @Input() hideButtons: boolean;
    /** @property hideCancel - Show or hide dialog cancel button */
    @Input() hideCancel: boolean;
    /** @property hideClose - Show or hide dialog close button */
    @Input() hideClose: boolean = this.config.hideClose;
    /** @property disableConfirm - Enable or disable dialog confirm button */
    @Input() disableConfirm: boolean;
    /** @property buttonsTemplate - Provide custom buttons template */
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
