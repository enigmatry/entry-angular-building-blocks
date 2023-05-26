/**
 * Alert dialog data
 */
export interface IEntryAlertDialogData {
    /** @property title - Dialog header title */
    title: string;
    /** @property message - Dialog content message */
    message: string;
    /** @property confirmText - Optional dialog confirm text label */
    confirmText?: string | undefined;
}
