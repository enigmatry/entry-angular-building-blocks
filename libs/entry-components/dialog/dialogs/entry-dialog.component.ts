import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, input, output, TemplateRef } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogRef, MatDialogState, MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { EntryButtonDirective } from '@enigmatry/entry-components/button';
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
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatIconButton, MatButton, MatIcon, NgTemplateOutlet, EntryButtonDirective]
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

    /**
     * Emitted when the confirm button is pressed; the dialog stays open until it is closed with a result.
     * In a dialog wrapped in a form, save from the form's `(ngSubmit)` instead: this fires before the form commits controls that update on `submit`.
     */
    readonly confirmed = output();
    /** Emitted when the cancel or close button is pressed; the dialog then closes with `undefined` unless a handler closed it */
    readonly canceled = output();

    protected readonly confirm = (event: Event): void => {
        if (this.disableConfirm() || !this.isOpen()) {
            // Stops the submit of a wrapping form, which a disabled-interactive button does not prevent on its own
            event.preventDefault();
            return;
        }
        this.confirmed.emit();
    };

    protected readonly cancel = (): void => {
        if (!this.isOpen()) {
            return;
        }
        this.canceled.emit();
        if (this.isOpen()) {
            this.dialogRef.close();
        }
    };

    private readonly isOpen = (): boolean => this.dialogRef.getState() === MatDialogState.OPEN;
}
