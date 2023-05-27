/**
 * Alert dialog data
 *
 * @property title - Dialog header title
 * @property message - Dialog content message
 * @property confirmText - Optional dialog confirm text label
 */
export interface IEntryAlertDialogData {
    /** Dialog header title */
    title: string;
    /** Dialog content message */
    message: string;
    /** Optional dialog confirm text label */
    confirmText?: string | undefined;
}
