/* eslint-disable no-secrets/no-secrets */
import { Component, inject, Input, TemplateRef } from '@angular/core';
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
    styleUrls: ['./entry-dialog.component.scss'],
    standalone: false
})
export class EntryDialogComponent {
    protected readonly mdDialogRef: MatDialogRef<EntryDialogComponent> = inject(MatDialogRef<EntryDialogComponent>);
    protected readonly config: EntryDialogConfig = inject(ENTRY_DIALOG_CONFIG);

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

    @Input() confirm: () => Observable<unknown> = () => of(true);
    @Input() cancel = () => this.close(false);

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
