/* eslint-disable no-secrets/no-secrets */
import { Component, inject, input, TemplateRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { EntryDialogButtonsAlignment } from '../entry-dialog-buttons-alignment.type';
import { ENTRY_DIALOG_CONFIG, EntryDialogConfig } from '../entry-dialog-config.model';

/**
 * Base Entry dialog component. Must be extended when building custom dialogs.
 *
 * @example
 * ```html
 * <entry-dialog title="TITLE"><p>Dialog content</p></entry-dialog>
 * ```
 */
@Component({
    selector: 'entry-dialog',
    templateUrl: './entry-dialog.component.html',
    styleUrl: './entry-dialog.component.scss',
    standalone: false
})
export class EntryDialogComponent {
    protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
    protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);

    /** Dialog header title  */
    readonly title = input('');
    /** Dialog buttons horizontal alignment */
    readonly buttonsAlignment = input<EntryDialogButtonsAlignment>(this.config.buttonsAlignment);
    /** Confirm button label */
    readonly confirmButtonText = input(this.config.confirmButtonText);
    /** Cancel button label */
    readonly cancelButtonText = input(this.config.cancelButtonText);
    /** Show or hide dialog buttons */
    readonly hideButtons = input(false);
    /** Show or hide dialog cancel button */
    readonly hideCancel = input(false);
    /** Show or hide dialog close button */
    readonly hideClose = input(this.config.hideClose);
    /** Enable or disable dialog confirm button */
    readonly disableConfirm = input(false);
    /** Provide custom buttons template */
    readonly buttonsTemplate = input<TemplateRef<any> | null | undefined>(undefined);

    readonly confirm = input<() => Observable<unknown>>(() => of(true));
    readonly cancel = input<() => void>(() => this.close(false));

    /** Invokes the `cancel` callback. Keeps `cancel()()` out of the template. */
    onCancel = () => this.cancel()();

    onSubmit = () =>
        this.confirm()().subscribe({
            next: closeDialog => {
                if (closeDialog) {
                    this.close(closeDialog);
                }
            }
        });

    close = (value: unknown = true) => this.mdDialogRef.close(value);
}
