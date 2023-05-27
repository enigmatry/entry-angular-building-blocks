/**
 * Alert dialog data.
 *
 * @property title - Dialog header title
 * @property message - Dialog content message
 * @property confirmText - Optional dialog confirm text label
 * @property disableClose - Optionally disable closing dialog when pressing escape or clicking on backdrop
 */
export interface IEntryAlertDialogData {
    /** Dialog header title */
    title: string;
    /** Dialog content message */
    message: string;
    /** Optional dialog confirm text label */
    confirmText?: string | undefined;
    /** Optionally disable closing dialog when pressing escape or clicking on backdrop */
    disableClose?: boolean | undefined;
}
