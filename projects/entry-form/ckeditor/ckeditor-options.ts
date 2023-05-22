import { InjectionToken } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

export interface EntryCkeditorOptions {
  build: CKEditor5.EditorConstructor;
  config?: CKEditor5.Config;
}

export const ENTRY_CKEDITOR_OPTIONS = new InjectionToken<EntryCkeditorOptions>('EntryCkeditorOptions');
