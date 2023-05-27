import { InjectionToken } from '@angular/core';
import { EntryDialogButtonsAlignment } from './entry-dialog-buttons-alignment.type';

/**
 * Used to provide default configurations on module level.
 *
 * @property confirmButtonText - Confirm button label (default 'Ok')
 * @property cancelButtonText - Cancel button label (default 'Cancel')
 * @property buttonsAlignment - Dialog buttons horizontal alignment (default 'align-right')
 * @property hideClose - Determines if close button is visible (default is false)
 * @property disableClose - Disable closing dialog when pressing escape or clicking on backdrop (default false)
 */
export class EntryDialogConfig {
    /** Confirm button label (default 'Ok') */
    confirmButtonText: string;
    /** Cancel button label (default 'Cancel') */
    cancelButtonText: string;
    /** Dialog buttons horizontal alignment (default 'align-right') */
    buttonsAlignment: EntryDialogButtonsAlignment;
    /** Determines if close button is visible (default is false) */
    hideClose: boolean;
    /** Disable closing dialog when pressing escape or clicking on backdrop (default false) */
    disableClose: boolean;

    constructor(config: Partial<EntryDialogConfig> = {}) {
        this.confirmButtonText = config.confirmButtonText ?? 'Ok';
        this.cancelButtonText = config.cancelButtonText ?? 'Cancel';
        this.buttonsAlignment = config.buttonsAlignment ?? 'align-right';
        this.hideClose = config.hideClose ?? false;
        this.disableClose = config.disableClose ?? false;
    }
}
export const ENTRY_DIALOG_CONFIG = new InjectionToken<EntryDialogConfig>(
    'EntryDialogConfig',
    {
        providedIn: 'root',
        factory: () => new EntryDialogConfig()
    }
);
