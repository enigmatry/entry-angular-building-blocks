import { EntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Confirm dialog data. Extends EntryAlertDialogData.
 */
export interface EntryConfirmDialogData extends EntryAlertDialogData {
    /** Cancel button label (default from `EntryDialogConfig`) */
    cancelText?: string;
}
