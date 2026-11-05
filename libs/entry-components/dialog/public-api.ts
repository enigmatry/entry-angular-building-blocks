
export { EntryAlertDialogComponent } from './dialogs/alert/entry-alert-dialog.component';
export type { EntryAlertDialogData } from './dialogs/alert/entry-alert-dialog-data.interface';

export { EntryConfirmDialogComponent } from './dialogs/confirm/entry-confirm-dialog.component';
export type { EntryConfirmDialogData } from './dialogs/confirm/entry-confirm-dialog-data.interface';

export { EntryErrorDialogComponent } from './dialogs/error/entry-error-dialog.component';
export type { EntryErrorDialogData } from './dialogs/error/entry-error-dialog-data.interface';

export { EntryDialogComponent } from './dialogs/entry-dialog.component';
export { EntryDialog } from './entry-dialog';
export { injectEntryDialog } from './inject-entry-dialog';
export type { EntryDialogContent } from './entry-dialog-content.interface';
export type { EntryDialogOpenArguments } from './entry-dialog-open-arguments.type';

export type { EntryDialogButtonsAlignment } from './entry-dialog-buttons-alignment.type';
export { EntryDialogService } from './entry-dialog.service';
export { EntryDialogModule } from './entry-dialog.module';

export { ENTRY_DIALOG_CONFIG, EntryDialogConfig, provideEntryDialogConfig } from './entry-dialog-config.model';
