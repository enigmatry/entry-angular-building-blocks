import { EntryDialogButtonsAlignment } from '../../entry-dialog-buttons-alignment.type';

/**
 * Alert dialog data.
 */
export interface EntryAlertDialogData {
    /** Dialog header title */
    title: string;
    /** Dialog content message */
    message: string;
    /** Dialog buttons horizontal alignment (default from `EntryDialogConfig`) */
    buttonsAlignment?: EntryDialogButtonsAlignment;
    /** Confirm button label (default from `EntryDialogConfig`) */
    confirmText?: string;
    /** Hide the close button (default from `EntryDialogConfig`) */
    hideClose?: boolean;
    /** Disable closing dialog when pressing escape or clicking on backdrop (default from `EntryDialogConfig`) */
    disableClose?: boolean;
}
