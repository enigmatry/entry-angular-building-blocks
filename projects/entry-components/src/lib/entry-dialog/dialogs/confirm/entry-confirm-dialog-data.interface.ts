import { IEntryAlertDialogData } from '../alert/entry-alert-dialog-data.interface';

export interface IEntryConfirmDialogData extends IEntryAlertDialogData {
    cancelText?: string | undefined;
}
