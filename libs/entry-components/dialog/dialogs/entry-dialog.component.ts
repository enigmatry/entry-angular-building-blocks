import { Component, inject, input, output, TemplateRef } from '@angular/core';
import { MatDialogRef, MatDialogState } from '@angular/material/dialog';
import { EntryDialogButtonsAlignment } from '../entry-dialog-buttons-alignment.type';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../entry-dialog-config.model';

/**
 * Dialog layout: title, close button, content and confirm/cancel buttons. The dialog component that renders it
 * closes the dialog with its result through `injectEntryDialog()`.
 *
 * @example
 * ```html
 * <entry-dialog title="TITLE" (confirmed)="dialog.close(true)"><p>Dialog content</p></entry-dialog>
 * ```
 */
@Component({
    selector: 'entry-dialog',
    templateUrl: './entry-dialog.component.html',
    styleUrl: './entry-dialog.component.scss',
    standalone: false
})
export class EntryDialogComponent {
    protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);
    private readonly dialogRef = inject<MatDialogRef<unknown>>(MatDialogRef);

    /** Dialog header title  */
    readonly title = input('');
    /** Dialog buttons horizontal alignment */
    readonly buttonsAlignment = input<EntryDialogButtonsAlignment>(this.config.buttonsAlignment);
    /** Confirm button label */
    readonly confirmButtonText = input(this.config.confirmButtonText);
    /** Cancel button label */
    readonly cancelButtonText = input(this.config.cancelButtonText);
    /** Hide the dialog buttons */
    readonly hideButtons = input(false);
    /** Hide the cancel button */
    readonly hideCancel = input(false);
    /** Hide the close button */
    readonly hideClose = input(this.config.hideClose);
    /** Disable the confirm button; it stays focusable and ignores clicks and Enter */
    readonly disableConfirm = input(false);
    /** Provide custom buttons template */
    readonly buttonsTemplate = input<TemplateRef<unknown> | null | undefined>(undefined);

    /** Emitted when the confirm button is pressed; the dialog stays open until it is closed with a result */
    readonly confirmed = output();
    /** Emitted when the cancel or close button is pressed; the dialog then closes with `undefined` unless a handler closed it */
    readonly canceled = output();

    protected readonly confirm = (event: Event): void => {
        if (this.disableConfirm()) {
            // Stops the submit of a wrapping form, which a disabled-interactive button does not prevent on its own
            event.preventDefault();
            return;
        }
        this.confirmed.emit();
    };

    protected readonly cancel = (): void => {
        this.canceled.emit();
        if (this.dialogRef.getState() === MatDialogState.OPEN) {
            this.dialogRef.close();
        }
    };
}
