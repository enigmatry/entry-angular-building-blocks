import { InjectionToken } from '@angular/core';

/**
 * Used to provide default configurations on module level
 */
export class EntryDialogConfig {
    /** @property confirmButtonText - Confirm button label (default 'Ok') */
    confirmButtonText: string;
    /** @property cancelButtonText - Cancel button label (default 'Cancel') */
    cancelButtonText: string;
    /** @property buttonsAlignment - Buttons alignment on dialog (default 'align-right') */
    buttonsAlignment: 'align-right' | 'align-center' | '';
    /** @property hideClose - Determines if close button is visible (default is false) */
    hideClose: boolean;
    /** @property disableClose - Disable closing dialog when pressing escape or clicking on backdrop (default false) */
    disableClose: boolean;

    constructor(config: Partial<EntryDialogConfig> = {}) {
        this.confirmButtonText = config.confirmButtonText ?? 'Ok';
        this.cancelButtonText = config.cancelButtonText ?? 'Cancel';
        this.buttonsAlignment = config.buttonsAlignment ?? 'align-right';
        this.hideClose = config.hideClose ?? false;
        this.disableClose = config.disableClose ?? false;
    }
}
export const ENTRY_DIALOG_CONFIG = new InjectionToken<EntryDialogConfig>('EntryDialogConfig',
    {
        providedIn: 'root',
        factory: () => new EntryDialogConfig()
    }
);
