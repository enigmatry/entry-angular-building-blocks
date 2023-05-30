import { EntryDialogButtonsAlignment } from '../../entry-dialog-buttons-alignment.type';

/**
 * Alert dialog data.
 */
export interface IEntryAlertDialogData {
    /** Dialog header title */
    title: string;
    /** Dialog content message */
    message: string;
    /** Optional dialog buttons horizontal alignment */
    buttonsAlignment: EntryDialogButtonsAlignment | undefined;
    /** Optional dialog confirm text label */
    confirmText?: string | undefined;
    /** Optionally show or hide dialog close button */
    hideClose: boolean | undefined;
    /** Optionally disable closing dialog when pressing escape or clicking on backdrop */
    disableClose?: boolean | undefined;
}
