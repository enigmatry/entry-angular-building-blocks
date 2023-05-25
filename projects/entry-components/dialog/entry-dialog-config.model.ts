import { InjectionToken } from '@angular/core';

export class EntryDialogConfig {
    confirmButtonText: string;
    cancelButtonText: string;
    buttonsAlignment: 'align-right' | 'align-center' | '';

    constructor(config: Partial<EntryDialogConfig> = {}) {
        this.confirmButtonText = config.confirmButtonText ?? 'Ok';
        this.cancelButtonText = config.cancelButtonText ?? 'Cancel';
        this.buttonsAlignment = config.buttonsAlignment ?? 'align-right';
    }
}
export const ENTRY_DIALOG_CONFIG = new InjectionToken<EntryDialogConfig>('EntryDialogConfig',
    {
        providedIn: 'root',
        factory: () => new EntryDialogConfig()
    }
);
