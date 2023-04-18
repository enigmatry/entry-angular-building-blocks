import { InjectionToken } from '@angular/core';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';

export const ENTRY_CKEDITOR_BUILD = new InjectionToken<CKEditor5.EditorConstructor>('CkeditorBuild');
