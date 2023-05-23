import { InjectionToken } from '@angular/core';

export class EntryDialogConfig {
    constructor(
        public confirmButtonText: string = 'Ok',
        public cancelButtonText: string = 'Cancel',
        public buttonsAlignment: 'align-right' | 'align-center' | '' = 'align-right'
    ) { }
}
export const ENTRY_DIALOG_CONFIG = new InjectionToken<EntryDialogConfig>(
    'ENTRY_DIALOG_CONFIG',
    {
        providedIn: 'root',
        factory: () => new EntryDialogConfig()
    }
);
