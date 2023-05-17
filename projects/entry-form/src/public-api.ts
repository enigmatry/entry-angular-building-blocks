/*
 * Public API Surface of entry-form
 */
export * from './lib/interfaces';
export * from './lib/services';

export { FormlyAutocompleteModule } from './lib/components/autocomplete/formly-autocomplete.module';
export { FormlyCkeditorModule } from './lib/components/ckeditor/formly-ckeditor.module';
export { EntryCkeditorOptions, ENTRY_CKEDITOR_OPTIONS } from './lib/components/ckeditor/ckeditor-options';

// Removed temporary until library has versioning implemented in sync with Angular versioning
// export { FormlyDateTimePickerModule } from './lib/components/date-time-picker/formly-date-time-picker.module';
// export { NgxMatDateFnsAdapter } from './lib/components/date-time-picker/date-fns-adapter';

export { EntryFormModule } from './lib/entry-form.module';
