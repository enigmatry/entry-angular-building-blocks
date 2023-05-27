import { IEntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

/**
 * Confirm dialog data
 *
 * @property cancelText - Optional dialog cancel text label
 */
export interface IEntryConfirmDialogData extends IEntryAlertDialogData {
    /** Optional dialog cancel text label */
    cancelText?: string | undefined;
}
