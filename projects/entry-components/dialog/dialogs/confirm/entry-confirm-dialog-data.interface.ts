import { IEntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Confirm dialog data
 */
export interface IEntryConfirmDialogData extends IEntryAlertDialogData {
    /** @property cancelText - Optional dialog cancel text label */
    cancelText?: string | undefined;
}
