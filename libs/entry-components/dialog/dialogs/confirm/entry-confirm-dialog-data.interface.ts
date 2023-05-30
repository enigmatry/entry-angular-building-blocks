import { IEntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Confirm dialog data. Extends IEntryAlertDialogData.
 */
export interface IEntryConfirmDialogData extends IEntryAlertDialogData {
    /** Optional dialog cancel text label */
    cancelText?: string | undefined;
}
