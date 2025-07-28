import { Provider } from '@angular/core';
import { createInjectionToken, provideConfig } from '@enigmatry/entry-components/common';
import { EntryDialogButtonsAlignment } from './entry-dialog-buttons-alignment.type';

/**
 * Used to provide default configurations on module level.
 */
export class EntryDialogConfig {
    /** Confirm button label (default 'Ok') */
    confirmButtonText: string;
    /** Cancel button label (default 'Cancel') */
    cancelButtonText: string;
    /** Dialog buttons horizontal alignment (default 'align-right') */
    buttonsAlignment: EntryDialogButtonsAlignment;
    /** Determines if close button is visible (default is true) */
    hideClose: boolean;
    /** Disable closing dialog when pressing escape or clicking on backdrop (default false) */
    disableClose: boolean;

    constructor(config: Partial<EntryDialogConfig> = {}) {
        this.confirmButtonText = config.confirmButtonText ?? 'Ok';
        this.cancelButtonText = config.cancelButtonText ?? 'Cancel';
        this.buttonsAlignment = config.buttonsAlignment ?? 'end';
        this.hideClose = config.hideClose ?? true;
        this.disableClose = config.disableClose ?? false;
    }
}

/**
 * Entry dialog injection token of EntryDialogConfig type containing dialog default configurations.
 *
 * Defaults:
 * - confirmButtonText: 'Ok'
 * - cancelButtonText: 'Cancel'
 * - buttonsAlignment: 'end'
 * - hideClose: true
 * - disableClose: false
 */
export const ENTRY_DIALOG_CONFIG = createInjectionToken(new EntryDialogConfig());

/**
 * Can be used to provide entry dialog configuration.
 */
export const provideEntryDialogConfig = (config: Partial<EntryDialogConfig>): Provider =>
    provideConfig(ENTRY_DIALOG_CONFIG, () => new EntryDialogConfig(config));
